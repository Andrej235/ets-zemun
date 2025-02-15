import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import sr from "@assets/json-data/i18n/sr.json";
import en from "@assets/json-data/i18n/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "sr",
    resources: {
      sr: {
        translation: sr,
      },
      en: {
        translation: en,
      },
    },
  });

export default i18n;

