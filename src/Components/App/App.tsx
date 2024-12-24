//@text-transform-ignore
import { Outlet } from "react-router";
import AppHeader from "@components/AppHeader/AppHeader";
import "./App.scss";
import LanguageContext, { Language } from "@contexts/language-context";
import { useEffect, useState } from "react";

function App() {
  const [language, setLanguage] = useState<Language>("sr-cyr");
  function changeLanguage(newLang: Language) {
    localStorage.setItem("language", newLang);
    setLanguage(newLang);
  }

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language;
    if (storedLanguage) setLanguage(storedLanguage);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "l") {
        changeLanguage(language === "sr-cyr" ? "sr-lat" : "sr-cyr");
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
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
