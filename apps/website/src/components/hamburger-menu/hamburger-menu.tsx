import HamburgerNavigation from "@components/hamburger-navigation/hamburger-navigation";
import "./hamburger-menu.scss";

import Icon from "@components/icon/icon";
import { useState, useEffect, useRef } from "react";
import useOutsideClick from "@hooks/use-outside-click";
import { useTranslation } from "react-i18next";
import { useRevalidator } from "react-router";

type HamburgerMenuProps = {
  readonly isHamburgerMenuOpen: boolean;
  readonly onRequestOpen: () => void;
  readonly onRequestClose: () => void;
};

function HamburgerMenu({
  isHamburgerMenuOpen,
  onRequestOpen,
  onRequestClose,
}: HamburgerMenuProps) {
  const [selectedTheme, setSelectedTheme] = useState<
    "light" | "dark" | "system"
  >("system");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { i18n } = useTranslation();
  const revalidator = useRevalidator();

  const languageOptions = {
    sr_lt: "Latinica",
    sr_cr: "Ћирилица",
    en: "English",
  };

  const currentLanguage = i18n.language as keyof typeof languageOptions;

  const handleLanguageChange = (newLanguage: keyof typeof languageOptions) => {
    i18n.changeLanguage(newLanguage);
    revalidator.revalidate();
  };

  const popupRef = useRef<HTMLDivElement>(null);

  useOutsideClick(popupRef, () => {
    setIsPopupOpen(false);
  });

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add(theme);
      setSelectedTheme(theme as "light" | "dark");
    } else {
      if (!window.matchMedia) return;

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const theme = mediaQuery.matches ? "dark" : "light";
      setSelectedTheme(theme);
      localStorage.setItem("theme", theme);
    }
  }, []);

  return (
    <>
      <button
        className={"hamburger-menu" + (isHamburgerMenuOpen ? " open" : "")}
        aria-label={
          isHamburgerMenuOpen ? "Zatvori navigaciju" : "Otvori navigaciju"
        }
        onClick={(e) => {
          if (isHamburgerMenuOpen) {
            onRequestClose?.();
          } else {
            onRequestOpen?.();
          }

          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <svg viewBox="0 0 32 32" aria-hidden>
          <path
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          />

          <path className="line" d="M7 16 27 16" />
        </svg>
      </button>

      {isHamburgerMenuOpen && (
        <button
          onClick={() => {
            setIsPopupOpen((prevState) => !prevState);
          }}
          className="settings-button-hamburger"
          aria-label="Open settings"
        >
          <Icon
            name="gear"
            className={`gear ${isPopupOpen ? "active" : ""}`}
          ></Icon>
        </button>
      )}

      <div
        ref={popupRef}
        className={`settings-popup ${isPopupOpen ? "" : "closed"}`}
      >
        <div className="language-options">
          <button
            onClick={() => handleLanguageChange("sr_lt")}
            tabIndex={isPopupOpen ? 0 : -1}
            className={`language-button ${
              currentLanguage === "sr_lt" ? "active-language" : ""
            }`}
          >
            {languageOptions.sr_lt}
          </button>
          <button
            onClick={() => handleLanguageChange("sr_cr")}
            tabIndex={isPopupOpen ? 0 : -1}
            className={`language-button ${
              currentLanguage === "sr_cr" ? "active-language" : ""
            }`}
          >
            {languageOptions.sr_cr}
          </button>
          <button
            onClick={() => handleLanguageChange("en")}
            tabIndex={isPopupOpen ? 0 : -1}
            className={`language-button ${
              currentLanguage === "en" ? "active-language" : ""
            }`}
          >
            {languageOptions.en}
          </button>
        </div>
        <button
          className="theme-button"
          onClick={() => {
            const newTheme = selectedTheme === "light" ? "dark" : "light";
            document.documentElement.classList.add(newTheme);
            document.documentElement.classList.remove(selectedTheme);

            setSelectedTheme(newTheme);
            localStorage.setItem("theme", newTheme);
          }}
        >
          <div
            className={`theme-icons-container ${
              selectedTheme === "dark" && "dark-theme-active"
            }`}
          >
            <Icon
              name="lightbulb"
              className={`sun ${selectedTheme === "light" ? "active" : ""}`}
            />

            <Icon
              name="moon"
              className={`moon ${selectedTheme === "dark" ? "active" : ""}`}
            />
          </div>
        </button>
      </div>

      <HamburgerNavigation
        isMenuActive={isHamburgerMenuOpen}
        onRequestClose={isHamburgerMenuOpen ? onRequestClose : onRequestOpen}
      />
    </>
  );
}

export default HamburgerMenu;

