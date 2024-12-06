import { useMemo, useRef, useState } from "react";
import "./SearchBar.scss";
import Icon from "../Icon/Icon";
import * as searchMap from "@data/search-map.json";
import Fuse, { FuseResult } from "fuse.js";
import SearchMapSchema from "src/assets/json-data/ts-schemas/search-map.schema";
import { createPortal } from "react-dom";
import { Link } from "react-router";

export default function SearchBar() {
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

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={`search-bar-container${
          !isSearchBarVisible ? " search-bar-not-active" : ""
        }`}
        ref={containerRef}
      >
        <input
          type="text"
          className="search-bar"
          placeholder="Pretrazi..."
          onChange={(e) => {
            //TODO: Debounce this
            const result = fuse.search(e.target.value);
            setSearchAutoComplete(result);
            console.log(result);
          }}
        />
        <div className="search-bar-filler"></div>
      </div>

      <button
        className="search-button"
        onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}
      >
        <Icon name="magnifying-glass" />
      </button>

      {isSearchBarVisible &&
        createPortal(
          <div
            className="search-bar-auto-complete-container"
            style={(() => {
              if (!containerRef.current) return;
              const rect = containerRef.current.getBoundingClientRect();

              return {
                left: rect.left,
                top: rect.bottom,
                width: rect.width,
              };
            })()}
          >
            {searchAutoComplete.map((result) => (
              <div
                className="search-bar-auto-complete-item"
                key={result.item.url}
              >
                <Icon name={result.item.type === "page" ? "book" : "file"} />

                <Link to={result.item.url}>
                  <h1>{result.item.title}</h1>
                </Link>

                <p>{result.item.description}</p>
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
