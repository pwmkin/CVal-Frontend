import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Code,
  Download,
  FileText,
  GraduationCap,
  Info,
  InfoIcon,
  Languages,
  Share2,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import ScoreCircle from "../components/ui/ScoreCircle";
import Tabs from "../components/ui/Tabs";
import { SectionState } from "../services/api";
import { CVEvaluation, useHistoryStore } from "../store/historyStore";

const ResultsPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { getEvaluation } = useHistoryStore();

  const [activeTab, setActiveTab] = useState("overview");
  const [result, setResult] = useState<CVEvaluation | null>(null);
  const evaluation = result?.evaluation;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const evaluationData = getEvaluation(id);
      if (evaluationData) {
        setResult(evaluationData);
      }
      setLoading(false);
    }
  }, [id, getEvaluation]);

  const tabs = [
    {
      id: "overview",
      label: t("results.tabs.overview"),
      icon: <Info className="w-4 h-4" />,
    },
    {
      id: "experience",
      label: t("results.tabs.experience"),
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "education",
      label: t("results.tabs.education"),
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      id: "skills",
      label: t("results.tabs.skills"),
      icon: <Code className="w-4 h-4" />,
    },
    {
      id: "languages",
      label: t("results.tabs.languages"),
      icon: <Languages className="w-4 h-4" />,
    },
    {
      id: "format",
      label: t("results.tabs.format"),
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    {
      id: "recommendations",
      label: t("results.tabs.recommendations"),
      icon: <XCircle className="w-4 h-4" />,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!evaluation) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {t("errors.notFound")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {t("errors.evaluationNotFound")}
        </p>
        <Link to="/" className="btn-primary">
          {t("common.back")}
        </Link>
      </div>
    );
  }

  // Función para convertir SectionState a información visual
  const getSectionStateInfo = (state: SectionState) => {
    switch (state) {
      case "relevant":
        return {
          color: "bg-green-500",
          score: 90,
          icon: <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />,
        };
      case "present":
        return {
          color: "bg-yellow-500",
          score: 50,
          icon: <XCircle className="w-5 h-5 text-yellow-500 mr-2" />,
        };
      case "missing":
        return {
          color: "bg-red-500",
          score: 25,
          icon: <XCircle className="w-5 h-5 text-red-500 mr-2" />,
        };
      default:
        return {
          color: "bg-gray-500",
          score: 0,
          icon: <Info className="w-5 h-5 text-gray-500 mr-2" />,
        };
    }
  };

  const getStrengthsAndWeaknesses = () => {
    const strengths = [];
    const weaknesses = [];

    if (evaluation.summary.state === "relevant") {
      strengths.push(t("tips.summary.strong"));
    } else {
      weaknesses.push(t("tips.summary." + evaluation.summary.state));
    }

    if (evaluation.experience.state === "relevant") {
      const years = evaluation.experience.totalYears;
      strengths.push(t("tips.experience.strong", { years }));
    } else {
      weaknesses.push(t("tips.experience." + evaluation.experience.state));
    }

    if (evaluation.education.state === "relevant") {
      strengths.push(
        t("tips.education.strong", { level: evaluation.education.level })
      );
    } else {
      weaknesses.push(t("tips.education." + evaluation.education.state));
    }

    if (evaluation.skills.state === "relevant") {
      strengths.push(t("tips.skills.strong"));
    } else {
      weaknesses.push(
        t("tips.skills.missing", {
          missing: evaluation.skills.missingForTargetRole.join(", "),
        })
      );
    }

    if (evaluation.languages.state === "relevant") {
      strengths.push(t("tips.languages.strong"));
    } else {
      weaknesses.push(t("tips.languages." + evaluation.languages.state));
    }

    if (!evaluation.format.clean) {
      weaknesses.push(t("tips.format.clean.no"));
    } else {
      strengths.push(t("tips.format.clean.yes"));
    }

    return { strengths, weaknesses };
  };

  const { strengths, weaknesses } = getStrengthsAndWeaknesses();

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                {t("results.summary")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {evaluation.summary.feedback}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                  {t("results.strengths")}
                </h3>
                <ul className="space-y-2">
                  {strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {strength}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  {t("results.weaknesses")}
                </h3>
                <ul className="space-y-2">
                  {weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5">
                        <XCircle className="w-3 h-3" />
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {weakness}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        );

      case "experience": {
        const expState = getSectionStateInfo(evaluation.experience.state);
        const projState = getSectionStateInfo(evaluation.projects.state);
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="glass rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 md:mb-0 md:mr-4 flex items-center">
                  {expState.icon}
                  {t("results.tabs.experience")}
                </h3>
                <div className="flex-grow">
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                    <div
                      className={`h-full rounded-full ${expState.color}`}
                      style={{ width: `${expState.score}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-3 font-medium text-gray-800 dark:text-gray-200">
                  {`${evaluation.experience.totalYears} years`}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {evaluation.experience.feedback}
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 md:mb-0 md:mr-4 flex items-center">
                  {projState.icon}
                  {t("results.experience.projects")}
                </h3>
                <div className="flex-grow">
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                    <div
                      className={`h-full rounded-full ${projState.color}`}
                      style={{ width: `${projState.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {evaluation.projects.feedback}
              </p>
            </div>
          </motion.div>
        );
      }

      case "education": {
        const eduState = getSectionStateInfo(evaluation.education.state);
        const certState = getSectionStateInfo(evaluation.certifications.state);
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="glass rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 md:mb-0 md:mr-4 flex items-center">
                  {eduState.icon}
                  {t("results.tabs.education")}
                </h3>
                <div className="flex-grow">
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                    <div
                      className={`h-full rounded-full ${eduState.color}`}
                      style={{ width: `${eduState.score}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-3 font-medium text-gray-800 dark:text-gray-200">
                  {evaluation.education.level}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {evaluation.education.feedback}
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 md:mb-0 md:mr-4 flex items-center">
                  {certState.icon}
                  {t("results.education.certifications")}
                </h3>
                <div className="flex-grow">
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                    <div
                      className={`h-full rounded-full ${certState.color}`}
                      style={{ width: `${certState.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {evaluation.certifications.feedback}
              </p>
              {evaluation.certifications.list.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    {t("results.education.certificationsList")}
                  </h4>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                    {evaluation.certifications.list.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        );
      }

      case "skills": {
        const skillsState = getSectionStateInfo(evaluation.skills.state);
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="glass rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 md:mb-0 md:mr-4 flex items-center">
                  {skillsState.icon}
                  {t("results.tabs.skills")}
                </h3>
                <div className="flex-grow">
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                    <div
                      className={`h-full rounded-full ${skillsState.color}`}
                      style={{ width: `${skillsState.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {evaluation.skills.feedback}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                  {t("results.skills.listed")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {evaluation.skills.listed.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                  {t("results.skills.missing")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {evaluation.skills.missingForTargetRole.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                  {t("results.skills.leftover")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {evaluation.skills.leftover.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                {t("results.tips")}
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {new Array(4).fill(null).map((_, index) => (
                  <li key={index} className="flex items-start">
                    <InfoIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{t("tips.skills.general." + index)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      }

      case "languages": {
        const langState = getSectionStateInfo(evaluation.languages.state);
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="glass rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 md:mb-0 md:mr-4 flex items-center">
                  {langState.icon}
                  {t("results.tabs.languages")}
                </h3>
                <div className="flex-grow">
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                    <div
                      className={`h-full rounded-full ${langState.color}`}
                      style={{ width: `${langState.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {evaluation.languages.feedback}
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                {t("results.languages.detected")}
              </h3>
              {evaluation.languages.detected.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {evaluation.languages.detected.map((lang, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-800"
                    >
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">
                        {lang.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {lang.level}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300">
                  {t("tips.languages.missing")}
                </p>
              )}
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                {t("results.tips")}
              </h3>

              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {new Array(3).fill(null).map((_, index) => (
                  <li key={index} className="flex items-start">
                    <InfoIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{t("tips.languages.general." + index)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      }

      case "format":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="glass rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 md:mb-0 md:mr-4 flex items-center">
                  {evaluation.format.clean ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  {t("results.tabs.format")}
                </h3>
                <div className="flex-grow">
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        evaluation.format.clean ? "bg-green-500" : "bg-red-500"
                      }`}
                      style={{
                        width: evaluation.format.clean ? "100%" : "40%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="ml-3 font-medium text-gray-800 dark:text-gray-200">
                  {t(
                    `tips.format.clean.${
                      evaluation.format.clean ? "yesSort" : "noSort"
                    }`
                  )}
                </div>
              </div>
            </div>

            {!evaluation.format.clean && (
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                  {t("results.format.issues")}
                </h3>
                <ul className="space-y-2">
                  {evaluation.format.issues.map((issue, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5">
                        <XCircle className="w-3 h-3" />
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {issue}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                {t("results.tips")}
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {new Array(3).fill(null).map((_, index) => (
                  <li key={index} className="flex items-start">
                    <InfoIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{t("tips.format.general." + index)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );

      case "recommendations":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                {t("results.recommendations.priority")}
              </h3>
              <ul className="space-y-3">
                {evaluation.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {recommendation}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                {t("results.recommendations.general")}
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {new Array(4).fill(null).map((_, index) => (
                  <li key={index} className="flex items-start">
                    <InfoIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{t("tips.recommendations.general." + index)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      {/* Back button */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          {t("common.back")}
        </Link>
      </div>

      {/* Header */}
      <div className="glass rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {t("results.title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {result.fileName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {new Date(result.date).toLocaleString()}
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <ScoreCircle score={evaluation.fitScore} size="lg" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        defaultTabId="overview"
        onChange={setActiveTab}
        className="mt-6"
      />

      {/* Tab content */}
      <div className="mt-6">{renderTab()}</div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 mt-8">
        <Link to="/" className="btn-primary">
          {t("common.evaluateNew")}
        </Link>
        <button className="btn-outline flex items-center">
          <Share2 className="w-4 h-4 mr-2" />
          {t("results.share")}
        </button>
        <button className="btn-outline flex items-center">
          <Download className="w-4 h-4 mr-2" />
          {t("results.downloadPdf")}
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
