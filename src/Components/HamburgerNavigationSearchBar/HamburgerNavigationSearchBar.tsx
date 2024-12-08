import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "../Icon/Icon";
import "./HamburgerNavigationSearchBar.scss";
import SearchMapSchema from "src/assets/json-data/ts-schemas/search-map.schema";
import * as searchMap from "@data/search-map.json";
import Fuse, { FuseResult } from "fuse.js";
import { Link, useNavigate } from "react-router";
import FocusTrap from "focus-trap-react";
import { AnimatePresence, motion } from "motion/react";

type HamburgerNavigationSearchBarProps = {
  onRequestCloseHamburgerNavigation: () => void;
};

export default function HamburgerNavigationSearchBar({
  onRequestCloseHamburgerNavigation,
}: HamburgerNavigationSearchBarProps) {
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

  function handleGlobalKeyDown(e: KeyboardEvent) {
    if (/^[a-zA-Z0-9 ]$/.test(e.key) || e.key === "Backspace") {
      inputRef.current!.focus();
      inputRef.current?.onkeydown?.(e);
      return;
    }

    if (!autoCompleteContainerRef.current) return;
    const children = autoCompleteContainerRef.current.children;
    const activeElement = document.activeElement;

    if (e.key === "Home") {
      e.preventDefault();
      (children[0] as HTMLAnchorElement).focus();
      return;
    } else if (e.key === "End") {
      e.preventDefault();
      (children[children.length - 1] as HTMLAnchorElement).focus();
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
      (child as HTMLAnchorElement).focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();

      const child =
        children[(currentIndex - 1 + children.length) % children.length];
      (child as HTMLAnchorElement).focus();
    }
  }

  useEffect(() => {
    containerRef.current?.addEventListener("keydown", handleGlobalKeyDown);
    return () =>
      containerRef.current?.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(searchAutoComplete[0].item.url);
                setIsAutoCompleteShown(false);
                onRequestCloseHamburgerNavigation();
              }
            }}
            onChange={(e) => {
              //TODO: Debounce this
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

        <AnimatePresence>
          {isAutoCompleteShown && (
            <motion.div
              key="auto-complete"
              className="search-bar-auto-complete-container"
              ref={autoCompleteContainerRef}
              initial={{
                y: "-100%",
              }}
              animate={{
                y: "0",
              }}
              exit={{
                y: "-125%",
              }}
              transition={{
                duration: 0.3,
              }}
            >
              {searchAutoComplete.slice(0, 15).map((result) => (
                <Link
                  to={result.item.url}
                  onClick={onRequestCloseHamburgerNavigation}
                  className="search-bar-auto-complete-item"
                  key={result.item.url}
                >
                  <p className="title">{result.item.title}</p>
                  <p className="description">{result.item.description}</p>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FocusTrap>
  );
}
