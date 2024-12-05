import { useMemo, useState } from "react";
import "./SearchBar.scss";
import Icon from "../Icon/Icon";
import * as searchMap from "@data/search-map.json";
import Fuse, { FuseResult } from "fuse.js";
import SearchMapSchema from "src/assets/json-data/ts-schemas/search-map.schema";

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

  return (
    <>
      <div
        className={`search-bar-container${
          !isSearchBarVisible ? " search-bar-not-active" : ""
        }`}
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
    </>
  );
}
