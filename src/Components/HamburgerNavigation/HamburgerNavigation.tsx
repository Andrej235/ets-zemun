import { createPortal } from "react-dom";
import "./HamburgerNavigation.scss";
import { Link } from "react-router";

type HamburgerNavigationProps = {
  isMenuActive: boolean;
};

export default function HamburgerNavigation({
  isMenuActive,
}: HamburgerNavigationProps) {
  return createPortal(
    <div
      className={`hamburger-navigation${
        !isMenuActive ? " navigation-not-active" : ""
      }`}
    >
      <div className="nav-bar">
        <div className="nav-bar-tab"><Link to="/">O nama</Link></div>
        <div className="nav-bar-tab"><Link to="/">Obrazovni profili</Link></div>
        <div className="nav-bar-tab"><Link to="/">Ucenici</Link></div>
        <div className="nav-bar-tab"><Link to="/">Novosti</Link></div>
        <div className="nav-bar-tab"><Link to="/">Dokumenta</Link></div>
      </div>
    </div>,
    document.body
  );
}
