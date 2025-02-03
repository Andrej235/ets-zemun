//@text-transform-ignore
import { Outlet, ScrollRestoration, useSearchParams } from "react-router";
import AppHeader from "@components/app-header/app-header";
import "./app.scss";
import LanguageContext, { localLanguages } from "@contexts/language-context";
import { useEffect, useState, useCallback, useRef } from "react";
import Scroller from "@components/scroller/scroller";
import AppFooter from "@components/app-footer/app-footer";
import SetLanguageContext from "@contexts/set-language-context";

function App() {
  const [language, setLanguage] = useState<string>("sr-cyr");
  const changeLanguage = useCallback((newLang: string) => {
    localStorage.setItem("language", newLang);
    setLanguage(newLang);
  }, []);

  useEffect(() => {
    const languages = [
      ...localLanguages,
      ...(JSON.parse(
        import.meta.env.VITE_AVAILABLE_LIBRE_LANGUAGES
      ) as string[]),
    ];

    let storedLanguage = localStorage.getItem("language") ?? "sr-cyr";

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
  }, [language, changeLanguage]);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const searchKey = searchParams.get("searchKey");
    if (!searchKey) return;

    const element = document.querySelector(
      `[data-search-key="${searchKey}"]`
    ) as HTMLElement;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const offset = rect.top + window.scrollY - headerRef.current!.clientHeight;

    window.scrollTo({ top: offset, behavior: "smooth" });
  }, [searchParams]);

  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <LanguageContext.Provider value={language}>
      <SetLanguageContext.Provider value={changeLanguage}>
        <div id="app">
          <ScrollRestoration />

          <AppHeader ref={headerRef} />

          <div id="page-content">
            <Outlet />
          </div>

          <Scroller />

          <AppFooter />
        </div>
      </SetLanguageContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;

