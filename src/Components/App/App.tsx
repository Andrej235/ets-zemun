import { Outlet } from "react-router";
import AppHeader from "../AppHeader/AppHeader";
import "./App.scss";
import LanguageContext, { Language } from "@contexts/language-context";
import { useEffect, useState } from "react";

function App() {
  const [language, setLanguage] = useState<Language>("sr-cyr");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "l") {
        setLanguage((language) =>
          language === "sr-cyr" ? "sr-lat" : "sr-cyr"
        );
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setLanguage]);

  return (
    <div id="app">
      <AppHeader />

      <div id="page-content">
        <LanguageContext.Provider value={language}>
          <Outlet />
        </LanguageContext.Provider>
      </div>
    </div>
  );
}

export default App;
