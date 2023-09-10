import React from "react";
import css from "./product-feature.module.scss";
import Card from "src/components/card/card";
import { useAppSelector } from "src/redux/config-store";
import ListCard from "src/components/list-card";

function ProductFeature() {
  const list = useAppSelector((state) => state.productReducer.listProduct);
  return (
    <div>
      <h2 className={css["heading"]}>Product Feature</h2>
      {/* {list.map((item) => {
        return <Card key={item.id} data={item} />;
      })} */}
      <div className={css["container"]}>
        <ListCard list={list} />
      </div>
    </div>
  );
}

export default ProductFeature;