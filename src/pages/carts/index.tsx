import React from "react";
import css from "./carts.module.scss";

function Carts() {
  return (
    <div className={css["container"]}>
      <div>
        <h2 className={css["title"]}>Carts</h2>
      </div>
      <div className={css["table-container"]}>
        <table className={css["table"]}>
          <thead>
            <tr className={css["table-head"]}>
              <th className={css["table-text"]}>id</th>
              <th className={css["table-text"]}>img</th>
              <th className={css["table-text"]}>name</th>
              <th className={css["table-text"]}>price</th>
              <th className={css["table-text"]}>quantity</th>
              <th className={css["table-text"]}>total</th>
              <th className={css["table-text"]}>action</th>
            </tr>
          </thead>
          <tbody>
            <tr className={css["table-body"]} key={1}>
              <td className={css["table-text"]}></td>
              <td className={css["table-img"]}></td>
              <td className={css["table-text"]}></td>
              <td className={css["table-text"]}></td>
              <td className={css["quantity"]}>
                <button className={css["quantity-button"]}>-</button>
                <span className={css["quantity-number"]}>1</span>
                <button className={css["quantity-button"]}>+</button>
              </td>
              <td className={css["table-text"]}></td>
              <td>
                <button className={css["delete-button"]}>DELETE</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={css["submit-button-container"]}>
        <button onClick={() => {}} className={css["submit-button"]}>
          SUBMIT ORDER
        </button>
      </div>
    </div>
  );
}

export default Carts;
