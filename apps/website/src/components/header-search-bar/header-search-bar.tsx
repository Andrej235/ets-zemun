import "./header-search-bar.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/icon/icon";
import searchMap from "@/assets/json-data/data/search-map.json";
import Fuse, { FuseResult } from "fuse.js";
import { useNavigate } from "react-router";
import FocusTrap from "focus-trap-react";
import AutoCompleteSuggestions from "@/components/auto-complete-suggestions/auto-complete-suggestions";
import SearchEntry from "src/types/search/search-entry";
import { useTranslation } from "react-i18next";

export default function HeaderSearchBar() {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fuse = useMemo(
    () =>
      new Fuse(searchMap.entries as SearchEntry[], {
        keys: [
          {
            name: "title",
            getFn: (entry) => t(entry.title),
          },
          {
            name: "keywords",
            getFn: (entry) =>
              t(entry.keywords, {
                returnObjects: true,
              }) as string[],
          },
        ],
      }),
    [t]
  );

  const [searchAutoComplete, setSearchAutoComplete] = useState<
    FuseResult<SearchEntry>[]
  >([]);

  const [isAutoCompleteShown, setIsAutoCompleteShown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoCompleteContainerRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleClose() {
    if (isAutoCompleteShown) {
      setIsAutoCompleteShown(false);
      setTimeout(() => {
        setIsSearchBarVisible(false);
      }, 150);
    } else setIsSearchBarVisible(false);
  }

  function handleOpen() {
    setIsSearchBarVisible(true);
    setTimeout(() => {
      inputRef.current!.focus();
    }, 300);
  }

  useEffect(() => {
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
        activeElement === inputRef.current ||
        activeElement === buttonRef.current
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

    if (!isSearchBarVisible || !containerRef.current) return;
    const container = containerRef.current;

    container.addEventListener("keydown", handleGlobalKeyDown);
    return () => container.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isSearchBarVisible]);

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
              placeholder={`${t("header.searchBarPlaceholder")}...`}
              ref={inputRef}
              name="search"
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(searchAutoComplete[0].item.url);
                  handleClose();
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

            <div className="filler" />
          </div>

          <button
            className="search-button"
            onClick={isSearchBarVisible ? handleClose : handleOpen}
            ref={buttonRef}
            aria-label={t("header.searchBarPlaceholder")}
          >
            <Icon name="magnifying-glass" />
          </button>
        </div>

        <AutoCompleteSuggestions
          containerRef={containerRef}
          buttonRef={buttonRef}
          inputRef={inputRef}
          isAutoCompleteShown={isAutoCompleteShown}
          searchAutoComplete={searchAutoComplete}
          onBeforeNavigate={() => setIsAutoCompleteShown(false)}
        />
      </div>
    </FocusTrap>
  );
}

