import "./AppHeader.scss";
import { Link } from "react-router";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import HeaderSearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import FocusTrap from "focus-trap-react";

export default function AppHeader() {
  const [isFocusTrapActive, setIsFocusTrapActive] = useState(false);

  return (
    <FocusTrap active={isFocusTrapActive && false}>
      <div id="app-header">
        <HamburgerMenu
          onOpen={() => setIsFocusTrapActive(true)}
          onClose={() => setIsFocusTrapActive(false)}
        />

        <Link to="/" className="logo">
          <img src="./logo.png" alt="Logo" />
        </Link>

        <div className="app-header-navigation">
          <div className="nav-bar">
            <Link to="/">O nama</Link>
            <Link to="/profili">Obrazovni profili</Link>
            <Link to="/ucenici">Ucenici</Link>
            <Link to="/novosti">Novosti</Link>
            <Link to="/dokumenta">Dokumenta</Link>
          </div>

          <HeaderSearchBar />
        </div>
      </div>
    </FocusTrap>
  );
}
