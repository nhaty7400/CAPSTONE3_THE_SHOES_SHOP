import React, { useEffect, useState } from "react";
import css from "./search-result.module.scss";
import ListCard from "src/components/list-card";
import { useDispatch } from "react-redux";
import { sortCart } from "src/redux/slices/product.slice";
import { AppDispatch } from "src/redux/config-store";

type Props = {
  list: any[];
};

const DECREASE = "decrease";
const INCREASE = "increase";

function SearchResult(props: Props) {
  const [value, setValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  function handleSelect(event: any) {
    setValue(event.target.value);
    if (value === "decrease") {
      const action = sortCart("decrease");
      dispatch(action);
    }
    if (value === "increase") {
      const action = sortCart("increase");
      dispatch(action);
    }
  }

  return (
    <div>
      <h2 className={css["big-title"]}>Search Result</h2>
      <div className={css["container"]}>
        <h3 className={css["filter-title"]}>Price</h3>
        <select onChange={handleSelect} className={css["filter"]}>
          <option value="increase">Increase</option>
          <option value="decrease">Decrease</option>
        </select>
        <ListCard list={props.list} />
      </div>
    </div>
  );
}

export default SearchResult;
