import AutoCompleteSuggestions from "@/components/auto-complete-suggestions/auto-complete-suggestions";
import Icon from "@/components/icon/icon";
import { useRouter } from "@/i18n/navigation";
import { SearchEntry, searchMap } from "@/lib/search-map";
import FocusTrap from "focus-trap-react";
import Fuse, { FuseResult } from "fuse.js";
import { useTranslations } from "next-intl";
import { useMemo, useRef, useState } from "react";
import "./hamburger-navigation-search-bar.scss";

type HamburgerNavigationSearchBarProps = {
  readonly onRequestCloseHamburgerNavigation: () => void;
};

export default function HamburgerNavigationSearchBar({
  onRequestCloseHamburgerNavigation,
}: HamburgerNavigationSearchBarProps) {
  const [isAutoCompleteShown, setIsAutoCompleteShown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null!);
  const inputRef = useRef<HTMLInputElement>(null!);
  const buttonRef = useRef<HTMLButtonElement>(null!);
  const navigate = useRouter().push;

  const t = useTranslations();

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
            getFn: (entry) => t.raw(entry.keywords) as string[],
          },
        ],
      }),
    [t]
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
            placeholder={`${t("header.searchBarPlaceholder")}...`}
            aria-label={t("header.searchBarPlaceholder")}
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
            aria-label={t("header.searchBarPlaceholder")}
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
