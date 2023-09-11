import React from "react";
import css from "./search-bar.module.scss";
import { useAppSelector } from "src/redux/config-store";
import { useDispatch } from "react-redux";
import { searchProduct } from "src/redux/slices/product.slice";

function SearchBar() {
  const dispatch = useDispatch();
  const valueSearch = useAppSelector((state) => {
    return state.productReducer.valueSearch;
  });
  return (
    <div className={css["container"]}>
      <h3 className={css["title"]}>Search</h3>
      <input
        onChange={(event) => {
          const action = searchProduct(event?.target.value);
          dispatch(action);
        }}
        value={valueSearch}
        className={css["search-input"]}
        placeholder="product name"
        type="text"
      />
      <button
        onClick={() => {
          const action = searchProduct("");
          dispatch(action);
        }}
        className={css["clear-button"]}
      >
        CLEAR
      </button>
    </div>
  );
}

export default SearchBar;
