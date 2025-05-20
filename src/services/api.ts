import { ProcessFileResult } from "../utils/fileProcessor";

// const API_BASE_URL = "http://localhost:8787/api";
const API_BASE_URL = "https://cval-api.pwmkin-dev.workers.dev/api";

export type SectionState = "relevant" | "present" | "missing";

export interface EvaluationResponse {
  fitScore: number;
  summary: {
    state: SectionState;
    feedback: string;
  };
  experience: {
    state: SectionState;
    totalYears: number;
    feedback: string;
  };
  education: {
    state: SectionState;
    level: "Bachelor" | "Master" | "PhD" | "Other";
    feedback: string;
  };
  skills: {
    state: SectionState;
    listed: string[];
    missingForTargetRole: string[];
    leftover: string[];
    feedback: string;
  };
  languages: {
    state: SectionState;
    detected: Array<{
      name: string;
      level: string;
    }>;
    feedback: string;
  };
  certifications: {
    state: SectionState;
    list: string[];
    feedback: string;
  };
  projects: {
    state: SectionState;
    feedback: string;
  };
  format: {
    clean: boolean;
    issues: string[];
  };
  recommendations: string[];
}

export const evaluateCV = async (
  fileData: ProcessFileResult,
  language: string,
  jobTitle: string,
  turnstileToken?: string | null
): Promise<EvaluationResponse> => {
  if (!turnstileToken) {
    throw new Error("Turnstile token is required");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/evaluate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: fileData.text,
        fileName: fileData.fileName,
        fileType: fileData.fileType,
        turnstileToken,
        language,
        jobTitle,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to evaluate CV");
    }

    return await response.json();
  } catch (error) {
    console.error("Error evaluating CV:", error);
    throw error;
  }
};
