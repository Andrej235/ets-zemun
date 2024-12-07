import Icon from "../Icon/Icon";
import "./HamburgerNavigationSearchBar.scss";

export default function HamburgerNavigationSearchBar() {
  return (
    <div className="search-bar-container">
      <input type="text" className="search-bar" placeholder="Pretrazi..." />
      <button className="search-button">
        <Icon name="magnifying-glass" />
      </button>
    </div>
  );
}
