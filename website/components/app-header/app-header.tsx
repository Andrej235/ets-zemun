"use client";
import HamburgerMenu from "@/components/hamburger-menu/hamburger-menu";
import HeaderSearchBar from "@/components/header-search-bar/header-search-bar";
import Icon from "@/components/icon/icon";
import { Link, usePathname } from "@/i18n/navigation";
import useOutsideClick from "@/lib/hooks/use-outside-click";
import { FocusTrap } from "focus-trap-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";
import "./app-header.scss";

const AppHeader = forwardRef<HTMLDivElement>((_, ref) => {
  const { setTheme, theme } = useTheme();
  const themeRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (theme === "dark") {
      themeRef.current.classList.add("dark-theme-active");
      themeRef.current.children[0].classList.add("active");
      themeRef.current.children[1].classList.remove("active");
    } else {
      themeRef.current.classList.remove("dark-theme-active");
      themeRef.current.children[0].classList.remove("active");
      themeRef.current.children[1].classList.add("active");
    }
  }, [theme]);

  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const t = useTranslations();
  const currentLanguage = useLocale();
  const pathname = usePathname();

  const languageOptions = {
    srb: "Ћирилица",
    lat: "Latinica",
    eng: "English",
  };

  const popupRef = useRef<HTMLDivElement>(null!);

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
          href="/"
          className="logo"
          tabIndex={isHamburgerMenuOpen ? -1 : undefined}
          aria-hidden={isHamburgerMenuOpen}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={96}
            height={96}
            fetchPriority="low"
          />
        </Link>
        <div className="app-header-navigation">
          <div className="nav-bar header-nav-bar">
            <Link href="/">{t("header.links.0")}</Link>
            <Link href="/profili">{t("header.links.1")}</Link>
            <Link href="/ucenici">{t("header.links.2")}</Link>
            <Link href="/novosti">{t("header.links.3")}</Link>
            <Link href="/dokumenta">{t("header.links.4")}</Link>
          </div>

          <HeaderSearchBar />

          <button
            onClick={() => {
              setIsPopupOpen((prevState) => !prevState);
            }}
            className="settings-button ignore-use-outside-click"
            aria-label="Open settings"
          >
            <Icon
              name="gear"
              className={`gear ${
                isPopupOpen ? "active" : ""
              } ignore-use-outside-click`}
            ></Icon>
          </button>

          <div
            ref={popupRef}
            className={`settings-popup ${isPopupOpen ? "" : "closed"}`}
          >
            <div className="language-options">
              <Link
                href={pathname}
                locale="srb"
                tabIndex={isPopupOpen ? 0 : -1}
                className={`language-button ${
                  currentLanguage === "srb" ? "active-language" : ""
                }`}
              >
                {languageOptions.srb}
              </Link>

              <Link
                href={pathname}
                locale="lat"
                tabIndex={isPopupOpen ? 0 : -1}
                className={`language-button ${
                  currentLanguage === "lat" ? "active-language" : ""
                }`}
              >
                {languageOptions.lat}
              </Link>

              <Link
                href={pathname}
                locale="eng"
                tabIndex={isPopupOpen ? 0 : -1}
                className={`language-button ${
                  currentLanguage === "eng" ? "active-language" : ""
                }`}
              >
                {languageOptions.eng}
              </Link>
            </div>
            <button
              className="theme-button"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <div
                suppressHydrationWarning
                className={`theme-icons-container ${
                  theme === "dark" ? "dark-theme-active" : ""
                }`}
                ref={themeRef}
              >
                <Icon
                  suppressHydrationWarning
                  name="lightbulb"
                  className={`sun ${theme === "light" ? "active" : ""}`}
                />

                <Icon
                  suppressHydrationWarning
                  name="moon"
                  className={`moon ${theme === "dark" ? "active" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
        <div className="background" />
      </div>
    </FocusTrap>
  );
});

AppHeader.displayName = "AppHeader";
export default AppHeader;
