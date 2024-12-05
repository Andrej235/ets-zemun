import "./AppHeader.scss";
import { Link } from "react-router";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import SearchBar from "../SearchBar/SearchBar";

export default function AppHeader() {
  return (
    <div id="app-header">
      <HamburgerMenu />

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

        <SearchBar />
      </div>
    </div>
  );
}
