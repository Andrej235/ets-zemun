import "./AutoCompleteSuggestions.scss";
import { useEffect, useRef } from "react";
import SearchMapSchema from "src/assets/json-data/ts-schemas/search-map.schema";
import { FuseResult } from "fuse.js";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";

type AutoCompleteSuggestions = {
  containerRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
  isAutoCompleteShown: boolean;
  searchAutoComplete: FuseResult<SearchMapSchema["entries"][number]>[];
  onBeforeNavigate: () => void;
};

export default function AutoCompleteSuggestions({
  containerRef,
  buttonRef,
  inputRef,
  isAutoCompleteShown,
  searchAutoComplete,
  onBeforeNavigate,
}: AutoCompleteSuggestions) {
  const autoCompleteContainerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  function handleGlobalKeyDown(e: KeyboardEvent) {
    if (/^[a-zA-Z0-9 ]$/.test(e.key) || e.key === "Backspace") {
      inputRef.current?.focus();
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
          {searchAutoComplete.length > 0 ? (
            searchAutoComplete.slice(0, 15).map((result) => (
              <button
                role="link"
                onClick={() => {
                  onBeforeNavigate();
                  navigate(result.item.url);
                }}
                className="search-bar-auto-complete-item"
                key={result.item.url}
              >
                <p className="title">{result.item.title}</p>
                <p className="description">{result.item.description}</p>
              </button>
            ))
          ) : (
            <p className="no-results">Nema rezultata</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
