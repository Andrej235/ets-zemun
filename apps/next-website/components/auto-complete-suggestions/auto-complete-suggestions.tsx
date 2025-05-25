import "./auto-complete-suggestions.scss";
import { useEffect, useRef } from "react";
import { FuseResult } from "fuse.js";
import { AnimatePresence, motion } from "motion/react";
import { SearchEntry } from "@/lib/search-map";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

type AutoCompleteSuggestions = {
  readonly containerRef: React.RefObject<HTMLDivElement>;
  readonly inputRef: React.RefObject<HTMLInputElement>;
  readonly buttonRef: React.RefObject<HTMLButtonElement>;
  readonly isAutoCompleteShown: boolean;
  readonly searchAutoComplete: FuseResult<SearchEntry>[];
  readonly onBeforeNavigate: () => void;
};

export default function AutoCompleteSuggestions({
  containerRef,
  buttonRef,
  inputRef,
  isAutoCompleteShown,
  searchAutoComplete,
  onBeforeNavigate,
}: AutoCompleteSuggestions) {
  const t = useTranslations();
  const autoCompleteContainerRef = useRef<HTMLDivElement>(null);

  const navigate = useRouter().push;

  useEffect(() => {
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
        (child as HTMLAnchorElement).focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();

        const child =
          children[(currentIndex - 1 + children.length) % children.length];
        (child as HTMLAnchorElement).focus();
      }
    }

    if (!containerRef.current) return;
    const container = containerRef.current;

    container.addEventListener("keydown", handleGlobalKeyDown);
    return () => container.removeEventListener("keydown", handleGlobalKeyDown);
  }, [containerRef, buttonRef, inputRef]);

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
              <a
                href={result.item.url}
                onClick={(e) => {
                  e.preventDefault();
                  onBeforeNavigate();
                  navigate(result.item.url);
                }}
                className="search-bar-auto-complete-item"
                key={result.item.id}
              >
                <p className="title">{t(result.item.title)}</p>
                <p className="description">{t(result.item.title)}</p>
              </a>
            ))
          ) : (
            <p className="no-results">Nema rezultata</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
