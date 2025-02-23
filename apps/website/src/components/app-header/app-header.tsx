import HamburgerMenu from "@components/hamburger-menu/hamburger-menu";
import HeaderSearchBar from "@components/header-search-bar/header-search-bar";
import FocusTrap from "focus-trap-react";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useRevalidator } from "react-router";
import "./app-header.scss";

const AppHeader = forwardRef<HTMLDivElement>((_, ref) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const revalidator = useRevalidator();

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
            onClick={() => {
              i18n.changeLanguage(i18n.language === "sr_lt" ? "en" : "sr_lt");
              revalidator.revalidate();
            }}
            className="language-button"
            aria-label="Promeni jezik"
          >
            {i18n.language === "sr_lt" ? <p>Srpski</p> : <p>English</p>}
          </button>
        </div>

        <div className="background" />
      </div>
    </FocusTrap>
  );
});

export default AppHeader;

