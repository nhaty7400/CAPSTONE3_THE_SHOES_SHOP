import React from "react";
import css from "./search-result.module.scss";
import ListCard from "src/components/list-card";
import { useAppSelector } from "src/redux/config-store";

function SearchResult() {
  const list = useAppSelector((state) => {
    return state.productReducer.searchResult;
  });
  return (
    <div>
      <h2 className={css["big-title"]}>Search Result</h2>
      <div className={css["container"]}>
        <h3 className={css["filter-title"]}>Price</h3>
        <select className={css["filter"]} name="" id="">
          <option value="increase">Increase</option>
          <option value="decrease">Decrease</option>
        </select>
        <ListCard list={list} />
      </div>
    </div>
  );
}

export default SearchResult;
