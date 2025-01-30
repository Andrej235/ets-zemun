import "./hamburger-navigation.scss";
import { Link } from "react-router";
import Icon from "@components/icon/icon";
import HamburgerNavigationSearchBar from "@components/hamburger-navigation-search-bar/hamburger-navigation-search-bar";
import { AnimatePresence, motion } from "motion/react";

type HamburgerNavigationProps = {
  readonly isMenuActive: boolean;
  readonly onRequestClose: () => void;
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
          <HamburgerNavigationSearchBar
            onRequestCloseHamburgerNavigation={onRequestClose}
          />

          <div className="nav-bar">
            <div className="nav-bar-tab">
              <Link to="/" onClick={onRequestClose}>
                <Icon name="school" />
                <p>O nama</p>
              </Link>
            </div>

            <div className="nav-bar-tab">
              <Link to="/profili" onClick={onRequestClose}>
                <Icon name="graduation-cap" />
                <p>Obrazovni profili</p>
              </Link>
            </div>

            <div className="nav-bar-tab">
              <Link to="/ucenici" onClick={onRequestClose}>
                <Icon name="user-graduate" />
                <p>Ucenici</p>
              </Link>
            </div>

            <div className="nav-bar-tab">
              <Link to="/novosti" onClick={onRequestClose}>
                <Icon name="newspaper" />
                <p>Novosti</p>
              </Link>
            </div>

            <div className="nav-bar-tab">
              <Link to="/dokumenta" onClick={onRequestClose}>
                <Icon name="folder-open" className="regular" />
                <p>Dokumenta</p>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
