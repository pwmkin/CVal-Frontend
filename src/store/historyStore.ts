import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EvaluationResponse } from "../services/api";

export interface CVEvaluation {
  id: string;
  fileName: string;
  fileType: string;
  date: string;
  content: string;
  evaluation: EvaluationResponse;
}

interface HistoryState {
  evaluations: CVEvaluation[];
  addEvaluation: (evaluation: CVEvaluation) => void;
  removeEvaluation: (id: string) => void;
  clearHistory: () => void;
  getEvaluation: (id: string) => CVEvaluation | undefined;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      evaluations: [],

      addEvaluation: (evaluation) => {
        set((state) => ({
          evaluations: [evaluation, ...state.evaluations],
        }));
      },

      removeEvaluation: (id) => {
        set((state) => ({
          evaluations: state.evaluations.filter((e) => e.id !== id),
        }));
      },

      clearHistory: () => {
        set({ evaluations: [] });
      },

      getEvaluation: (id) => {
        return get().evaluations.find((e) => e.id === id);
      },
    }),
    {
      name: "cv-evaluation-history",
    }
  )
);
