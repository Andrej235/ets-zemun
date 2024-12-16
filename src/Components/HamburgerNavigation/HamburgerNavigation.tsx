import "./HamburgerNavigation.scss";
import { Link } from "react-router";
import Icon from "../Icon/Icon";
import HamburgerNavigationSearchBar from "../HamburgerNavigationSearchBar/HamburgerNavigationSearchBar";
import { AnimatePresence, motion } from "motion/react";

type HamburgerNavigationProps = {
  isMenuActive: boolean;
  onRequestClose: () => void;
};

export default function HamburgerNavigation({
  isMenuActive,
  onRequestClose,
}: HamburgerNavigationProps) {
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
          <HamburgerNavigationSearchBar onRequestCloseHamburgerNavigation={onRequestClose} />

          <div className="nav-bar">
            <div className="nav-bar-tab">
              <Link to="/">
                <Icon name="school" />
                &nbsp;&nbsp;O nama
              </Link>
            </div>
            <div className="nav-bar-tab">
              <Link to="/">
                <Icon name="graduation-cap" />
                &nbsp;&nbsp;Obrazovni profili
              </Link>
            </div>
            <div className="nav-bar-tab">
              <Link to="/">
                <Icon name="user-graduate" />
                &nbsp;&nbsp;Ucenici
              </Link>
            </div>
            <div className="nav-bar-tab">
              <Link to="/">
                <Icon name="newspaper" />
                &nbsp;&nbsp;Novosti
              </Link>
            </div>
            <div className="nav-bar-tab">
              <Link to="/">
                <Icon name="folder-open" className="regular" />
                &nbsp;&nbsp;Dokumenta
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
