import "./SearchBar.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "../Icon/Icon";
import * as searchMap from "@data/search-map.json";
import Fuse, { FuseResult } from "fuse.js";
import SearchMapSchema from "src/assets/json-data/ts-schemas/search-map.schema";
import { Link, useNavigate } from "react-router";
import FocusTrap from "focus-trap-react";

export default function HeaderSearchBar() {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
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

  const [isAutoCompleteShown, setIsAutoCompleteShown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoCompleteContainerRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  function handleClose() {
    setIsSearchBarVisible(false);
    setIsAutoCompleteShown(false);
  }

  function handleOpen() {
    setIsSearchBarVisible(true);
    setTimeout(() => {
      inputRef.current!.focus();
    }, 300);
  }

  function handleGlobalKeyDown(e: KeyboardEvent) {
    if (/^[a-zA-Z0-9]$/.test(e.key) || e.key === "Backspace") {
      inputRef.current!.focus();
      inputRef.current?.onkeydown?.(e);
      return;
    }

    if (!autoCompleteContainerRef.current) return;
    const children = autoCompleteContainerRef.current.children;
    const activeElement = document.activeElement;

    if (e.key === "Home") {
      e.preventDefault();
      children[0].querySelector("a")?.focus();
      return;
    } else if (e.key === "End") {
      e.preventDefault();
      children[children.length - 1].querySelector("a")?.focus();
      return;
    }

    let currentIndex =
      activeElement === inputRef.current || activeElement === buttonRef.current
        ? -1
        : null;

    if (currentIndex === null) {
      for (let i = 0; i < children.length; i++) {
        const current = children[i];
        if (current.contains(activeElement)) {
          currentIndex = i;
          break;
        }
      }
    }

    currentIndex ??= 0;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      const child = children[(currentIndex + 1) % children.length];
      child?.querySelector("a")?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();

      const child =
        children[(currentIndex - 1 + children.length) % children.length];
      child?.querySelector("a")?.focus();
    }
  }

  useEffect(() => {
    if (!isSearchBarVisible) return;

    containerRef.current?.addEventListener("keydown", handleGlobalKeyDown);
    return () =>
      containerRef.current?.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isSearchBarVisible]);

  return (
    <FocusTrap
      active={isSearchBarVisible}
      focusTrapOptions={{
        allowOutsideClick: true,
        clickOutsideDeactivates: false,
        escapeDeactivates: true,
        onDeactivate: handleClose,
      }}
    >
      <div
        className={`search-bar-container${
          !isSearchBarVisible ? " search-bar-not-active" : ""
        }`}
        ref={containerRef}
      >
        <div className="search-container">
          <div className="search-bar-input-container">
            <input
              tabIndex={isSearchBarVisible ? undefined : -1}
              type="text"
              className="search-bar"
              placeholder="Pretrazi..."
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(searchAutoComplete[0].item.url);
                  handleClose();
                }
              }}
              onChange={(e) => {
                //TODO: Debounce this
                setSearchAutoComplete(fuse.search(e.target.value));
              }}
              onFocus={() => setIsAutoCompleteShown(true)}
            />

            <div className="filler" />
          </div>

          <button
            className="search-button"
            onClick={isSearchBarVisible ? handleClose : handleOpen}
            ref={buttonRef}
          >
            <Icon name="magnifying-glass" />
          </button>
        </div>

        <div
          className="search-bar-auto-complete-container"
          ref={autoCompleteContainerRef}
        >
          {isAutoCompleteShown &&
            searchAutoComplete.slice(0, 15).map((result) => (
              <div
                className="search-bar-auto-complete-item"
                key={result.item.url}
              >
                <div className="header">
                  <Icon name={result.item.type === "page" ? "book" : "file"} />

                  <Link to={result.item.url}>
                    <h1>{result.item.title}</h1>
                  </Link>
                </div>

                <p>{result.item.description}</p>
              </div>
            ))}
        </div>
      </div>
    </FocusTrap>
  );
}
