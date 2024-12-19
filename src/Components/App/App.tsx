import { Outlet } from "react-router";
import AppHeader from "../AppHeader/AppHeader";
import "./App.scss";
import LanguageContext, { Language } from "@contexts/language-context";
import { useState } from "react";

function App() {
  const [language, setLanguage] = useState<Language>("sr-cir");

  return (
    <div
      id="app"
      onKeyDown={(e) => {
        if (e.shiftKey && e.ctrlKey && e.key === "c")
          setLanguage((language) =>
            language === "sr-cir" ? "sr-lat" : "sr-cir"
          );
      }}
    >
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
