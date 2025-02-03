import { useMemo, useRef, useState } from "react";
import Icon from "@components/icon/icon";
import "./hamburger-navigation-search-bar.scss";
import searchMap from "@data/search-map.json";
import Fuse, { FuseResult } from "fuse.js";
import { useNavigate } from "react-router";
import FocusTrap from "focus-trap-react";
import AutoCompleteSuggestions from "@components/auto-complete-suggestions/auto-complete-suggestions";
import SearchEntry from "src/types/search/search-entry";

type HamburgerNavigationSearchBarProps = {
  readonly onRequestCloseHamburgerNavigation: () => void;
};

export default function HamburgerNavigationSearchBar({
  onRequestCloseHamburgerNavigation,
}: HamburgerNavigationSearchBarProps) {
  const [isAutoCompleteShown, setIsAutoCompleteShown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const fuse = useMemo(
    () =>
      new Fuse(searchMap.entries as SearchEntry[], {
        keys: ["title", "keywords"],
      }),
    []
  );

  const [searchAutoComplete, setSearchAutoComplete] = useState<
    FuseResult<SearchEntry>[]
  >([]);

  return (
    <FocusTrap
      active={isAutoCompleteShown}
      focusTrapOptions={{
        allowOutsideClick: true,
        clickOutsideDeactivates: true,
        escapeDeactivates: true,
        onDeactivate: () => setIsAutoCompleteShown(false),
      }}
    >
      <div className="search-bar-container" ref={containerRef}>
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Pretrazi..."
            aria-label="Pretrazivanje"
            ref={inputRef}
            name="search"
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(searchAutoComplete[0].item.url);
                setIsAutoCompleteShown(false);
                onRequestCloseHamburgerNavigation();
              }
            }}
            onChange={(e) => {
              if (e.target.value.length < 1) {
                setIsAutoCompleteShown(false);
                return;
              }

              setIsAutoCompleteShown(true);
              setSearchAutoComplete(fuse.search(e.target.value));
            }}
          />

          <button
            className="search-button"
            ref={buttonRef}
            onClick={() => {
              navigate(searchAutoComplete[0].item.url);
              setIsAutoCompleteShown(false);
              onRequestCloseHamburgerNavigation();
            }}
            aria-label="Pretrazi"
          >
            <Icon name="magnifying-glass" />
          </button>
        </div>

        <AutoCompleteSuggestions
          containerRef={containerRef}
          inputRef={inputRef}
          buttonRef={buttonRef}
          isAutoCompleteShown={isAutoCompleteShown}
          searchAutoComplete={searchAutoComplete}
          onBeforeNavigate={onRequestCloseHamburgerNavigation}
        />
      </div>
    </FocusTrap>
  );
}

