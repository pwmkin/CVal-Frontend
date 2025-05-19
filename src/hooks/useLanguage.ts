import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const SupportedLanguages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
];

export function useLanguage() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const currentLanguageName = SupportedLanguages.find(
    (l) => l.code === currentLanguage
  )?.name;

  const changeLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang);
      localStorage.setItem("i18nextLng", lang);
    },

    [i18n]
  );

  return {
    currentLanguage,
    changeLanguage,
    supportedLanguages: SupportedLanguages,
    currentLanguageName,
  };
}
