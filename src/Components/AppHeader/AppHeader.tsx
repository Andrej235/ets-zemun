import "./AppHeader.scss";
import { Link } from "react-router";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import HeaderSearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import FocusTrap from "focus-trap-react";

export default function AppHeader() {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

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
      <div id="app-header">
        <HamburgerMenu
          onOpen={() => setIsHamburgerMenuOpen(true)}
          onClose={() => setIsHamburgerMenuOpen(false)}
        />

        <Link
          to="/"
          className="logo"
          tabIndex={isHamburgerMenuOpen ? -1 : undefined}
        >
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

        <div className="background" />
      </div>
    </FocusTrap>
  );
}
