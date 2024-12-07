import { useMemo, useRef, useState } from "react";
import "./SearchBar.scss";
import Icon from "../Icon/Icon";
import * as searchMap from "@data/search-map.json";
import Fuse, { FuseResult } from "fuse.js";
import SearchMapSchema from "src/assets/json-data/ts-schemas/search-map.schema";
import { Link, useNavigate } from "react-router";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  function handleClose() {
    setIsSearchBarVisible(false);
    setSearchAutoComplete([]);
    inputRef.current!.value = "";
  }

  function handleOpen() {
    setIsSearchBarVisible(true);
    setTimeout(() => {
      inputRef.current!.focus();
    }, 300);
  }

  return (
    <div
      className={`search-bar-container${
        !isSearchBarVisible ? " search-bar-not-active" : ""
      }`}
    >
      <div className="search-container">
        <div className="search-bar-input-container" ref={containerRef}>
          <input
            type="text"
            className="search-bar"
            placeholder="Pretrazi..."
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Escape") handleClose();
              else if (e.key === "Enter") {
                navigate(searchAutoComplete[0].item.url);
                handleClose();
              }
            }}
            onChange={(e) => {
              //TODO: Debounce this
              setSearchAutoComplete(fuse.search(e.target.value));
            }}
          />

          <div className="filler" />
        </div>

        <button
          className="search-button"
          onClick={isSearchBarVisible ? handleClose : handleOpen}
        >
          <Icon name="magnifying-glass" />
        </button>
      </div>

      <div className="search-bar-auto-complete-container">
        {searchAutoComplete.map((result) => (
          <div className="search-bar-auto-complete-item" key={result.item.url}>
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
  );
}
