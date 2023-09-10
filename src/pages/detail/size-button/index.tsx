import React from "react";
import css from "./size-button.module.scss";

function SizeButton(props: any) {
  const { size } = props;
  return <button className={css["size-button"]}>{size}</button>;
}

export default SizeButton;
