//@text-transform-ignore
import { Outlet } from "react-router";
import AppHeader from "@components/app-header/app-header";
import "./app.scss";
import LanguageContext, { localLanguages } from "@contexts/language-context";
import { useEffect, useState } from "react";
import { Language } from "src/types/utility/language";
import Scroller from "@components/scroller/scroller";

function App() {
  const [language, setLanguage] = useState<Language>("sr-cyr");
  function changeLanguage(newLang: Language) {
    localStorage.setItem("language", newLang);
    setLanguage(newLang);
  }

  useEffect(() => {
    const languages = [
      ...localLanguages,
      ...(JSON.parse(
        import.meta.env.VITE_AVAILABLE_LIBRE_LANGUAGES
      ) as Language[]),
    ];

    let storedLanguage = (localStorage.getItem("language") ??
      "sr-cyr") as Language;

    if (!languages.includes(storedLanguage)) storedLanguage = "sr-cyr";
    setLanguage(storedLanguage);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "l") {
        changeLanguage(
          languages[(languages.indexOf(language) + 1) % languages.length]
        );
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [language]);

  return (
    <LanguageContext.Provider value={language}>
      <div id="app">
        <AppHeader />

        <div id="page-content">
          <Outlet />
        </div>

        <Scroller />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
