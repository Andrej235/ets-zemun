//@text-transform-ignore
import { Outlet } from "react-router";
import AppHeader from "@components/AppHeader/AppHeader";
import "./App.scss";
import LanguageContext, { languages } from "@contexts/language-context";
import { useEffect, useState } from "react";
import { Language } from "src/types/utility/language";

function App() {
  const [language, setLanguage] = useState<Language>("sr-cyr");
  function changeLanguage(newLang: Language) {
    localStorage.setItem("language", newLang);
    setLanguage(newLang);
  }

  useEffect(() => {
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
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
