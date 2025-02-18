import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import sr_cr from "@assets/json-data/i18n/sr_cr.json";
import sr_lt from "@assets/json-data/i18n/sr_lt.json";
import en from "@assets/json-data/i18n/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "sr_lt",
    resources: {
      sr_cr: {
        translation: sr_cr,
      },
      sr_lt: {
        translation: sr_lt,
      },
      en: {
        translation: en,
      },
    },
  });

export default i18n;

