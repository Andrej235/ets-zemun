import { createPortal } from "react-dom";
import "./HamburgerNavigation.scss";
import { Link } from "react-router";
import Icon from "../Icon/Icon";

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
        <div className="nav-bar-tab"><Link to="/"><Icon name="school"/>&nbsp;&nbsp;O nama</Link></div>
        <div className="nav-bar-tab"><Link to="/"><Icon name="graduation-cap"/>&nbsp;&nbsp;Obrazovni profili</Link></div>
        <div className="nav-bar-tab"><Link to="/"><Icon name="user-graduate"/>&nbsp;&nbsp;Ucenici</Link></div>
        <div className="nav-bar-tab"><Link to="/"><Icon name="newspaper"/>&nbsp;&nbsp;Novosti</Link></div>
        <div className="nav-bar-tab"><Link to="/"><Icon name="folder-open" className="regular"/>&nbsp;&nbsp;Dokumenta</Link></div>
      </div>
    </div>,
    document.body
  );
}
