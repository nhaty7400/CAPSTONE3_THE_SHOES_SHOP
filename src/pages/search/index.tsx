import React from "react";
import css from "./search.module.scss";
import SearchBar from "./search-bar";
import SearchResult from "./search-result";
import { useAppSelector } from "src/redux/config-store";

function Search() {
  let list = useAppSelector((state) => {
    return state.productReducer.searchResult;
  });
  return (
    <div>
      <SearchBar />
      <SearchResult list={list} />
    </div>
  );
}

export default Search;
