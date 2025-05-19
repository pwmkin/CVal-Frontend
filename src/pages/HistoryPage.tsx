import { motion } from "framer-motion";
import {
  AlertTriangle,
  FileText,
  Search,
  SortDesc,
  Trash2,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ScoreCircle from "../components/ui/ScoreCircle";
import { useHistoryStore } from "../store/historyStore";

const HistoryPage: React.FC = () => {
  const { t } = useTranslation();
  const { evaluations, clearHistory, removeEvaluation } = useHistoryStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "score">("date");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Filter and sort evaluations
  const filteredResults = evaluations
    .filter((evaluation) =>
      evaluation.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.evaluation.fitScore - a.evaluation.fitScore;
      }
    });

  const handleClearHistory = () => {
    clearHistory();
    setShowClearConfirm(false);
  };

  const handleSortChange = (type: "date" | "score") => {
    setSortBy(type);
  };

  return (
    <div className="flex flex-col space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {t("history.title")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t("history.subtitle")}
        </p>
      </div>

      {/* Filters and actions */}
      <div className="glass rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="input pl-10"
              placeholder={t("history.search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setSearchTerm("")}
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              </button>
            )}
          </div>

          {/* Sort options */}
          <div className="flex space-x-2">
            <button
              className={`btn ${
                sortBy === "date"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }`}
              onClick={() => handleSortChange("date")}
            >
              <SortDesc className="w-4 h-4 mr-2" />
              {t("history.date")}
            </button>
            <button
              className={`btn ${
                sortBy === "score"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }`}
              onClick={() => handleSortChange("score")}
            >
              <SortDesc className="w-4 h-4 mr-2" />
              {t("history.score")}
            </button>

            {/* Clear all */}
            {evaluations.length > 0 && (
              <button
                className="btn bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                onClick={() => setShowClearConfirm(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t("history.clear")}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results list */}
      {filteredResults.length > 0 ? (
        <div className="space-y-4">
          {filteredResults.map((result) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-xl p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 truncate">
                    {result.fileName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(result.date).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <ScoreCircle score={result.evaluation.fitScore} size="sm" />

                  <div className="flex space-x-2">
                    <Link
                      to={`/results/${result.id}`}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full"
                    >
                      <span className="sr-only">{t("common.view")}</span>
                      <FileText className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => removeEvaluation(result.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full"
                    >
                      <span className="sr-only">{t("common.delete")}</span>
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
            {t("history.noHistory")}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t("history.noHistoryDesc")}
          </p>
          <Link to="/" className="btn-primary">
            {t("common.evaluateNew")}
          </Link>
        </div>
      )}

      {/* Clear confirmation modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md mx-4"
          >
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-center text-gray-800 dark:text-gray-200 mb-2">
              {t("history.confirmClear")}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              {t("history.confirmClearDesc")}
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="btn-outline"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={handleClearHistory}
                className="btn bg-red-600 hover:bg-red-700 text-white"
              >
                {t("history.clearConfirm")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
