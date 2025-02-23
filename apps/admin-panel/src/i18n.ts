import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "sr_lt",
    supportedLngs: ["sr", "sr_lt", "en"],
    resources: {
      sr: {
        translation: {},
      },
      sr_lt: {
        translation: {},
      },
      en: {
        translation: {},
      },
    },
  });

export default i18n;

