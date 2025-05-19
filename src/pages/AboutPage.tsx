import { motion } from "framer-motion";
import { BellRing, Bot, CheckCircle2, Shield } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import Logo from "../components/ui/Logo";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: t("about.features.ai.title"),
      description: t("about.features.ai.description"),
    },
    {
      icon: (
        <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      ),
      title: t("about.features.scoring.title"),
      description: t("about.features.scoring.description"),
    },
    {
      icon: <BellRing className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: t("about.features.suggestions.title"),
      description: t("about.features.suggestions.description"),
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: t("about.features.privacy.title"),
      description: t("about.features.privacy.description"),
    },
  ];

  const faqs = [
    {
      question: t("about.faq.question1"),
      answer: t("about.faq.answer1"),
    },
    {
      question: t("about.faq.question2"),
      answer: t("about.faq.answer2"),
    },
    {
      question: t("about.faq.question3"),
      answer: t("about.faq.answer3"),
    },
    {
      question: t("about.faq.question4"),
      answer: t("about.faq.answer4"),
    },
  ];

  return (
    <div className="flex flex-col space-y-16 pb-12">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Logo className="w-20 h-20" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-br from-blue-600 to-pink-600 bg-clip-text text-transparent"
        >
          {t("about.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          {t("about.subtitle")}
        </motion.p>
      </div>

      {/* Mission */}
      <div className="glass rounded-xl p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {t("about.mission.title")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t("about.mission.description")}
        </p>
      </div>

      {/* Features */}
      <div>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
          {t("about.featuresTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
          {t("about.faqTitle")}
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
