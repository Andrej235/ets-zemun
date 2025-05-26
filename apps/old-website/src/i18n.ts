import en from "@/assets/json-data/i18n/en.json";
import sr_cr from "@/assets/json-data/i18n/sr_cr.json";
import sr_lt from "@/assets/json-data/i18n/sr_lt.json";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector/cjs";
import { initReactI18next } from "node_modules/react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem("i18nextLng") ?? "sr",
    fallbackLng: "sr",
    supportedLngs: ["sr", "sr_lt", "en"],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    resources: {
      sr: {
        translation: sr_cr,
      },
      sr_lt: {
        translation: sr_lt,
      },
      en: {
        translation: en,
      },
    },
    detection: {
      order: ["localStorage", "cookie", "header", "path", "subdomain"],
      caches: ["localStorage"],
    },
  });

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", lng);
});

export default i18n;
