import { motion } from "framer-motion";
import { Award, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/ui/FileUpload";
import JobTitleInput from "../components/ui/JobTitleInput";
import { useLanguage } from "../hooks/useLanguage";
import { evaluateCV } from "../services/api";
import { useHistoryStore } from "../store/historyStore";
import { randomId } from "../utils/evaluationUtils";
import { processFile } from "../utils/fileProcessor";

const TURNSTILE_SITE_KEY = "0x4AAAAAABd5n9E54XqTbU0w";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addEvaluation } = useHistoryStore();
  const { currentLanguageName } = useLanguage();

  const [jobTitle, setJobTitle] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processingStep, setProcessingStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isTurnstileLoading, setIsTurnstileLoading] = useState(false);
  const turnstileWidgetRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const [isTurnstileInitialized, setIsTurnstileInitialized] = useState(false);

  useEffect(() => {
    // Load Turnstile script on component mount
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // Initialize Turnstile once the script is loaded
      if (selectedFile && jobTitle) {
        initializeTurnstile();
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize Turnstile when file and job title are selected
  useEffect(() => {
    if (
      selectedFile &&
      jobTitle &&
      !turnstileToken &&
      !isTurnstileLoading &&
      window.turnstile
    ) {
      initializeTurnstile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, jobTitle]);

  const handleTurnstileCallback = (token: string) => {
    setTurnstileToken(token);
    setIsTurnstileLoading(false);

    // Automatically proceed with form submission once we have the token
    if (selectedFile && jobTitle) {
      processSubmission();
    }
  };

  const resetTurnstile = () => {
    if (window.turnstile && turnstileWidgetId.current) {
      window.turnstile.reset(turnstileWidgetId.current);
      setTurnstileToken(null);
    }
  };

  const handleFileSelected = async (file: File) => {
    setSelectedFile(file);
    setProcessingStep(0);
    setError(null);

    // Reset turnstile when file changes
    if (turnstileToken) {
      resetTurnstile();
    }
  };

  const initializeTurnstile = () => {
    if (
      !turnstileWidgetRef.current ||
      typeof window.turnstile === "undefined"
    ) {
      if (!document.querySelector('script[src*="turnstile/v0/api.js"]')) {
        const script = document.createElement("script");
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoaded";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        window.onTurnstileLoaded = () => {
          setTimeout(initializeTurnstile, 1000);
        };
      }
      return;
    }

    setIsTurnstileLoading(true);
    setIsTurnstileInitialized(true);

    if (turnstileWidgetId.current) {
      try {
        window.turnstile.remove(turnstileWidgetId.current);
      } catch (e) {
        console.error("Error removing turnstile widget:", e);
      }
    }

    if (turnstileWidgetRef.current) {
      turnstileWidgetRef.current.innerHTML = "";
    }

    try {
      turnstileWidgetId.current = window.turnstile.render(
        turnstileWidgetRef.current,
        {
          sitekey: TURNSTILE_SITE_KEY,
          callback: handleTurnstileCallback,
          "expired-callback": () => {
            setTurnstileToken(null);
            setIsTurnstileLoading(false);
          },
          "error-callback": () => {
            setError(t("errors.turnstile"));
            setIsTurnstileLoading(false);
          },
        }
      );
    } catch (e) {
      console.error("Error rendering turnstile widget:", e);
      setError(
        t("errors.turnstile") +
          " - " +
          (e instanceof Error ? e.message : String(e))
      );
      setIsTurnstileLoading(false);
    }
  };

  const processSubmission = async () => {
    if (!selectedFile || !turnstileToken) return;

    try {
      setIsProcessing(true);
      setError(null);

      // Process file
      setProcessingStep(1);
      const processedFile = await processFile(selectedFile);

      if (processedFile.error) {
        throw new Error(processedFile.error);
      }

      // Request evaluation
      setProcessingStep(2);
      const evaluation = await evaluateCV(
        processedFile,
        currentLanguageName || "English",
        jobTitle,
        turnstileToken
      );

      // Store the evaluation in history
      const evaluationWithMeta = {
        id: randomId(),
        fileName: processedFile.fileName,
        fileType: processedFile.fileType,
        date: new Date().toISOString(),
        evaluation,
        content: processedFile.text,
      };

      addEvaluation(evaluationWithMeta);

      // Reset Turnstile token after successful submission
      resetTurnstile();

      // Navigate to results page
      navigate(`/results/${evaluationWithMeta.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errors.processing"));
      setIsProcessing(false);
      // Reset Turnstile on error
      resetTurnstile();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile || !jobTitle) return;

    // If we already have a token, proceed with submission
    if (turnstileToken) {
      processSubmission();
      return;
    }

    // If Turnstile is not initialized yet, initialize it
    if (!isTurnstileInitialized && window.turnstile) {
      initializeTurnstile();
      return;
    }

    // If Turnstile is already initialized but we're waiting for token
    if (isTurnstileInitialized && !turnstileToken) {
      // Just show the loading state, the callback will handle submission
      setIsTurnstileLoading(true);
      return;
    }
  };

  const renderProcessingSteps = () => (
    <div className="w-full glass p-6 rounded-xl">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
        {t("home.processingTitle")}
      </h3>

      <div className="space-y-4">
        <div className="flex items-center">
          <div
            className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
              processingStep >= 1
                ? "bg-blue-100 dark:bg-blue-900/30"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            {processingStep > 1 ? (
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            ) : processingStep === 1 ? (
              <div className="w-4 h-4 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                1
              </span>
            )}
          </div>
          <div className="ml-3">
            <p
              className={`text-sm font-medium ${
                processingStep >= 1
                  ? "text-gray-800 dark:text-gray-200"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {t("home.processingStep1")}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div
            className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
              processingStep >= 2
                ? "bg-blue-100 dark:bg-blue-900/30"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            {processingStep > 2 ? (
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            ) : processingStep === 2 ? (
              <div className="w-4 h-4 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                2
              </span>
            )}
          </div>
          <div className="ml-3">
            <p
              className={`text-sm font-medium ${
                processingStep >= 2
                  ? "text-gray-800 dark:text-gray-200"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {t("home.processingStep2")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const features = [
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: t("home.features.ai"),
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: t("home.features.score"),
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: t("home.features.keywords"),
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: t("home.features.suggestions"),
    },
  ];

  const showTurnstileWidget = selectedFile && jobTitle !== "" && !isProcessing;

  return (
    <div className="flex flex-col space-y-10">
      {/* Hero Section */}
      <section className="pt-6 pb-12">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-br from-blue-600 to-pink-600 bg-clip-text text-transparent"
          >
            {t("home.welcome")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            {t("home.subtitle")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {isProcessing ? (
              renderProcessingSteps()
            ) : (
              <FileUpload
                onFileSelected={handleFileSelected}
                isProcessing={isProcessing}
              />
            )}

            <div className="flex flex-col space-y-2">
              <JobTitleInput
                value={jobTitle}
                onChange={setJobTitle}
                disabled={isProcessing}
              />
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 text-sm">
                <p className="font-medium">{t("errors.title")}</p>
                <p>{error}</p>
              </div>
            )}

            {/* Cloudflare Turnstile Widget Container */}
            {showTurnstileWidget && (
              <div className="flex justify-center">
                <div ref={turnstileWidgetRef} className="mt-4"></div>
              </div>
            )}

            {/* Turnstile Loading State */}
            {isTurnstileLoading && (
              <div className="flex justify-center">
                <div className="flex items-center">
                  <span className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {t("common.verifying")}
                  </span>
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={
                  (!selectedFile || isProcessing || !jobTitle) as boolean
                }
                className="btn-primary px-8 py-3 text-base"
              >
                {isProcessing ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {t("common.loading")}
                  </>
                ) : turnstileToken ? (
                  t("home.evaluateButton")
                ) : (
                  t("home.evaluateButton")
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            {t("home.features.title")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                className="glass p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {feature.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            {t("home.howItWorks.title")}
          </h2>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[19px] sm:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 z-0 sm:-ml-0.5" />

            {/* Steps */}
            <div className="space-y-12 relative z-10">
              {[
                t("home.howItWorks.step1"),
                t("home.howItWorks.step2"),
                t("home.howItWorks.step3"),
                t("home.howItWorks.step4"),
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`flex items-start sm:items-center ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                  </div>

                  <div
                    className={`ml-6 sm:ml-0 ${
                      index % 2 === 0 ? "sm:ml-6" : "sm:mr-6"
                    }`}
                  >
                    <div className="glass p-4 rounded-lg">
                      <p className="text-gray-800 dark:text-gray-200">{step}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoaded?: () => void;
  }
}

export default HomePage;
