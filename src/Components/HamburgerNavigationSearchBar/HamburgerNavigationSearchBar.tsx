import { useMemo, useRef, useState } from "react";
import Icon from "../Icon/Icon";
import "./HamburgerNavigationSearchBar.scss";
import SearchMapSchema from "src/assets/json-data/ts-schemas/search-map.schema";
import * as searchMap from "@data/search-map.json";
import Fuse, { FuseResult } from "fuse.js";
import { useNavigate } from "react-router";
import FocusTrap from "focus-trap-react";
import AutoCompleteSuggestions from "../AutoCompleteSuggestions/AutoCompleteSuggestions";

type HamburgerNavigationSearchBarProps = {
  onRequestCloseHamburgerNavigation: () => void;
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
      new Fuse(searchMap.entries as SearchMapSchema["entries"], {
        keys: ["title", "matchFor"],
      }),
    []
  );

  const [searchAutoComplete, setSearchAutoComplete] = useState<
    FuseResult<SearchMapSchema["entries"][number]>[]
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
