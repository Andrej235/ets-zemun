import { Link } from "react-router";
import "./AppHeader.scss";
import Icon from "../Icon/Icon";
import { useState } from "react";

export default function AppHeader() {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  return (
    <div id="app-header">
      <Link to="/" className="logo">
        <img src="./logo.png" alt="Logo" />
        <p>Elektrotehnicka skola "Zemun"</p>
      </Link>

      <div className="nav-bar">
        <Link to="/">O nama</Link>
        <Link to="/">Obrazovni profili</Link>
        <Link to="/">Nastavnici</Link>
        <Link to="/">Upis</Link>
        <Link to="/">Novosti</Link>
      </div>

      <Link className="apply-link" to="/apply">
        Apply now
      </Link>

      <button
        className="search-button"
        onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}
      >
        <Icon name="magnifying-glass" />
      </button>

      {isSearchBarVisible && (
        <div className="search-bar-container">
          <input type="text" className="search-bar" placeholder="Pretrazi..." />
        </div>
      )}
    </div>
  );
}
