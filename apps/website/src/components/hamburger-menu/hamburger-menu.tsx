import HamburgerNavigation from "@components/hamburger-navigation/hamburger-navigation";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import "./hamburger-menu.scss";

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
  const { i18n } = useTranslation();

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

      <motion.button
        animate={{
          display: isHamburgerMenuOpen ? "block" : "none",
          opacity: isHamburgerMenuOpen ? 1 : 0,
        }}
        onClick={() =>
          i18n.changeLanguage(i18n.language === "sr" ? "en" : "sr")
        }
        className="hamburger-menu-language"
        aria-hidden={!isHamburgerMenuOpen}
        tabIndex={isHamburgerMenuOpen ? 0 : -1}
        aria-label="Promeni jezik"
      >
        {i18n.language === "sr" ? <p>Srpski</p> : <p>English</p>}
      </motion.button>

      <HamburgerNavigation
        isMenuActive={isHamburgerMenuOpen}
        onRequestClose={isHamburgerMenuOpen ? onRequestClose : onRequestOpen}
      />
    </>
  );
}

export default HamburgerMenu;

