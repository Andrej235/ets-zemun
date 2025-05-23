"use client";
import HamburgerMenu from "@/components/hamburger-menu/hamburger-menu";
import HeaderSearchBar from "@/components/header-search-bar/header-search-bar";
import Icon from "@/components/icon/icon";
import useOutsideClick from "@/hooks/use-outside-click";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import FocusTrap from "focus-trap-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";
import "./app-header.scss";

const AppHeader = forwardRef<HTMLDivElement>((_, ref) => {
  const [selectedTheme, setSelectedTheme] = useState<
    "light" | "dark" | "system"
  >("system");

  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const t = useTranslations();
  const currentLanguage = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languageOptions = {
    srl: "Latinica",
    sr: "Ћирилица",
    en: "English",
  };

  const handleLanguageChange = (newLanguage: keyof typeof languageOptions) => {
    console.log("newLanguage", newLanguage);
    router.replace(pathname, { locale: newLanguage });
  };

  const popupRef = useRef<HTMLDivElement>(null!);

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
          <Image src="/logo.png" alt="Logo" width={96} height={96} />
        </Link>
        <div className="app-header-navigation">
          <div className="nav-bar">
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
              <button
                onClick={() => handleLanguageChange("srl")}
                tabIndex={isPopupOpen ? 0 : -1}
                className={`language-button ${
                  currentLanguage === "srl" ? "active-language" : ""
                }`}
              >
                {languageOptions.srl}
              </button>
              <button
                onClick={() => handleLanguageChange("sr")}
                tabIndex={isPopupOpen ? 0 : -1}
                className={`language-button ${
                  currentLanguage === "sr" ? "active-language" : ""
                }`}
              >
                {languageOptions.sr}
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
        </div>
        <div className="background" />
      </div>
    </FocusTrap>
  );
});

AppHeader.displayName = "AppHeader";
export default AppHeader;
