import "./hamburger-navigation.scss";
import { Link } from "react-router";
import Icon from "@/components/icon/icon";
import HamburgerNavigationSearchBar from "@/components/hamburger-navigation-search-bar/hamburger-navigation-search-bar";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type HamburgerNavigationProps = {
  readonly isMenuActive: boolean;
  readonly onRequestClose: () => void;
};

export default function HamburgerNavigation({
  isMenuActive,
  onRequestClose,
}: HamburgerNavigationProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (isMenuActive) {
      (document.scrollingElement as HTMLElement).style.overflowY = "hidden";
    } else {
      (document.scrollingElement as HTMLElement).style.overflowY = "auto";
    }

    return () => {
      (document.scrollingElement as HTMLElement).style.overflowY = "auto";
    };
  }, [isMenuActive]);

  return (
    <AnimatePresence>
      {isMenuActive && (
        <motion.div
          initial={{
            top: "-100%",
          }}
          animate={{
            top: "10rem",
          }}
          exit={{
            top: "-100%",
          }}
          transition={{
            duration: 0.3,
          }}
          className="hamburger-navigation"
          key="hamburger-navigation"
        >
          <HamburgerNavigationSearchBar
            onRequestCloseHamburgerNavigation={onRequestClose}
          />

          <div className="nav-bar">
            <div className="nav-bar-tab">
              <Link to="/" onClick={onRequestClose}>
                <Icon name="school" />
                <p>{t("header.links.0")}</p>
              </Link>
            </div>

            <div className="nav-bar-tab">
              <Link to="/profili" onClick={onRequestClose}>
                <Icon name="graduation-cap" />
                <p>{t("header.links.1")}</p>
              </Link>
            </div>

            <div className="nav-bar-tab">
              <Link to="/ucenici" onClick={onRequestClose}>
                <Icon name="user-graduate" />
                <p>{t("header.links.2")}</p>
              </Link>
            </div>

            <div className="nav-bar-tab">
              <Link to="/novosti" onClick={onRequestClose}>
                <Icon name="newspaper" />
                <p>{t("header.links.3")}</p>
              </Link>
            </div>

            <div className="nav-bar-tab">
              <Link to="/dokumenta" onClick={onRequestClose}>
                <Icon name="folder-open" className="regular" />
                <p>{t("header.links.4")}</p>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
