import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "sr",
    resources: {
      sr: {
        translation: {
          about: {
            hero: {
              title: 'Elektrotehnička škola "Zemun"',
              tagLine: "Mi ne čekamo budućnost, mi joj idemo u susret!",
            },
          },
        },
      },
      en: {
        translation: {
          about: {
            hero: {
              title: "Electrical Engineering School 'Zemun'",
              tagLine: "We don't wait for the future, we meet it head-on!",
            },
          },
        },
      },
    },
  });

export default i18n;

