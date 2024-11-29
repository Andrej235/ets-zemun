import { Link } from "react-router";
import "./AppHeader.scss";

export default function AppHeader() {
  return (
    <div id="app-header">
      <Link to="/">
        <img src="./logo.png" alt="Logo" />
      </Link>

      <Link to="/news">News</Link>
      <Link to="/info">Info</Link>
      <Link to="/profiles">Profiles</Link>
    </div>
  );
}
