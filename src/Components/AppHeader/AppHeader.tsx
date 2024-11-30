import { Link } from "react-router";
import "./AppHeader.scss";
import Icon from "../Icon/Icon";

export default function AppHeader() {
  return (
    <div id="app-header">
      <Link to="/" className="logo">
        <img src="./logo.png" alt="Logo" />
        ETS Zemun
      </Link>

      <div className="nav-bar">
        <Link to="/">O nama</Link>
        <Link to="/">Obrazovni profili</Link>
        <Link to="/">Radnici</Link>
        <Link to="/">Prijava</Link>
        <Link to="/">Novosti</Link>
      </div>

      <Link className="apply-link" to="/apply">
        Apply now
      </Link>

      <button className="search-button">
        <Icon name="magnifying-glass" />
      </button>
    </div>
  );
}
