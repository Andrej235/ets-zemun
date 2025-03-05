import HamburgerMenu from "@components/hamburger-menu/hamburger-menu";
import HeaderSearchBar from "@components/header-search-bar/header-search-bar";
import FocusTrap from "focus-trap-react";
import {forwardRef, useState, useRef} from 'react';
import { useTranslation } from "react-i18next";
import { Link, useRevalidator } from "react-router";
import "./app-header.scss";
import Icon from "@components/icon/icon";
import useOutsideClick from "@hooks/use-outside-click";

const AppHeader = forwardRef<HTMLDivElement>((_, ref) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { t, i18n } = useTranslation();
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

  return (
    <FocusTrap
      active={isHamburgerMenuOpen}
      focusTrapOptions={{
        escapeDeactivates: true,
        allowOutsideClick: false,
        clickOutsideDeactivates: false,
        onDeactivate: () => setIsHamburgerMenuOpen(false),
      }}
    >
      <div id="app-header" ref={ref}>
        <HamburgerMenu
          isHamburgerMenuOpen={isHamburgerMenuOpen}
          onRequestOpen={() => setIsHamburgerMenuOpen(true)}
          onRequestClose={() => setIsHamburgerMenuOpen(false)}
        />
        <Link
          to="/"
          className="logo"
          tabIndex={isHamburgerMenuOpen ? -1 : undefined}
          aria-hidden={isHamburgerMenuOpen}
        >
          <img src="/logo.png" alt="Logo" />
        </Link>
        <div className="app-header-navigation">
          <div className="nav-bar">
            <Link to="/">{t("header.links.0")}</Link>
            <Link to="/profili">{t("header.links.1")}</Link>
            <Link to="/ucenici">{t("header.links.2")}</Link>
            <Link to="/novosti">{t("header.links.3")}</Link>
            <Link to="/dokumenta">{t("header.links.4")}</Link>
          </div>

          <HeaderSearchBar />

          <button
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className="settings-button"
            aria-label="Open settings"
          >
            <Icon
              name="gear"
              className={`gear ${isPopupOpen ? "active" : ""}`}
            ></Icon>
          </button>

          <div ref={popupRef} className={`settings-popup ${isPopupOpen ? "" : "closed"}`}>
            <div className="language-options">
              <button
                onClick={() => handleLanguageChange("sr_lt")}
                className={`language-button ${currentLanguage === "sr_lt" ? "active-language" : ""}`}
              >
                {languageOptions.sr_lt}
              </button>
              <button
                onClick={() => handleLanguageChange("sr_cr")}
                className={`language-button ${currentLanguage === "sr_cr" ? "active-language" : ""}`}
              >
                {languageOptions.sr_cr}
              </button>
              <button
                onClick={() => handleLanguageChange("en")}
                className={`language-button ${currentLanguage === "en" ? "active-language" : ""}`}
              >
                {languageOptions.en}
              </button>
            </div>
          </div>
        </div>
        <div className="background" />
      </div>
    </FocusTrap>
  );
});

export default AppHeader;

