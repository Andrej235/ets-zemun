import "./AppHeader.scss";
import { useState } from "react";
import { Link } from "react-router";
import Icon from "../Icon/Icon";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

export default function AppHeader() {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  return (
    <div id="app-header">
      <HamburgerMenu />

      <Link to="/" className="logo">
        <img src="./logo.png" alt="Logo" />
        <p>Elektrotehnicka skola "Zemun"</p>
      </Link>

      <div className="app-header-navigation">
        <div className={`nav-bar${!isSearchBarVisible ? " search-bar-not-active-navbar" : ""}`}>
          <Link to="/">O nama</Link>
          <Link to="/">Obrazovni profili</Link>
          <Link to="/">Nastavnici</Link>
          <Link to="/">Upis</Link>
          <Link to="/">Novosti</Link>
        </div>

        <div className={`search-bar-container${!isSearchBarVisible ? " search-bar-not-active" : ""}`}>
          <input type="text" className="search-bar" placeholder="Pretrazi..." />
          <div className="search-bar-filler"></div>
        </div>

        <button
          className="search-button"
          onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}
        >
          <Icon name="magnifying-glass" />
        </button>
      </div>
    </div>
  );
}
