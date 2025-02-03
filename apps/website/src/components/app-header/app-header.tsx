import "./app-header.scss";
import { Link } from "react-router";
import HamburgerMenu from "@components/hamburger-menu/hamburger-menu";
import { useState, forwardRef } from "react";
import FocusTrap from "focus-trap-react";
import HeaderSearchBar from "@components/header-search-bar/header-search-bar";

const AppHeader = forwardRef<HTMLDivElement>((_, ref) => {
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
      <div id="app-header" ref={ref}>
        <HamburgerMenu
          isHamburgerMenuOpen={isHamburgerMenuOpen}
          onRequestOpen={() => setIsHamburgerMenuOpen(true)}
          onRequestClose={() => setIsHamburgerMenuOpen(false)}
        />

        <Link
          to="/"
          className="logo"
          tabIndex={isHamburgerMenuOpen ? -1 : undefined}
          aria-hidden={isHamburgerMenuOpen}
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
});

export default AppHeader;

