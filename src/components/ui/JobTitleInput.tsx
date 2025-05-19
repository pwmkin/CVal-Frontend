import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface JobTitleInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const JobTitleInput: React.FC<JobTitleInputProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {t("home.jobTitle")}
      </label>
      <motion.div
        animate={{
          borderColor: focused ? "#3b82f6" : "#d1d5db",
          backgroundColor: disabled ? "#f3f4f644" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`flex items-center border rounded-xl px-3 py-2 transition-colors dark:border-gray-700 dark:bg-gray-800 ${
          focused ? "ring-1 ring-blue-500" : ""
        }`}
      >
        <Briefcase className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder={t("home.jobTitlePlaceholder")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className="w-full bg-transparent border-none outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        />
      </motion.div>
    </div>
  );
};

export default JobTitleInput;
