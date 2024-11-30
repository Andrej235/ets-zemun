import { Link } from "react-router";
import "./AppHeader.scss";
import Icon from "../Icon/Icon";

export default function AppHeader() {
  return (
    <div id="app-header">
      <Link to="/">
        <img src="./logo.png" alt="Logo" />
        ETS Zemun
      </Link>

      <div className="nav-bar">
        <Link to="/news">News</Link>
        <Link to="/info">Info</Link>
        <Link to="/profiles">Profiles</Link>
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
