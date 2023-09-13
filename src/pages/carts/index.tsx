import React from "react";
import css from "./carts.module.scss";
import { useAppSelector, useAppDispatch } from "src/redux/config-store";
import { useDispatch } from "react-redux";
import {
  changeProductBuyQuantity,
  deleteFromCart,
  emptyCart,
} from "src/redux/slices/product.slice";
import { getLocalStorage } from "src/utils";
import { EMAIL } from "src/constants";
import { sendOrders } from "src/services/user.service";

export type Cart = {
  id: string;
  name: string;
  img: string;
  price: any;
  quantity: any;
};

export type orderDetail = {
  productId: string;
  quantity: any;
};

export type Orders = {
  orderDetail: orderDetail[];
  email: string;
};

export const handleTotal = (quantity: number, price: number) => {
  return quantity * price;
};

function Carts() {
  let cart = useAppSelector((state) => {
    return state.productReducer.cart;
  });

  const dispatch = useDispatch();
  // const appDispatch=useAppDispatch();

  const renderCart = (cart: Cart[]) => {
    return cart.map((item) => {
      return (
        <tr className={css["table-body"]} key={item.id}>
          <td className={css["table-text"]}>{item.id}</td>
          <td className={css["table-img"]}>
            <img
              style={{
                width: "10rem",
                height: "8rem",
              }}
              src={item.img}
              alt=""
            />
          </td>
          <td className={css["table-text"]}>{item.name}</td>
          <td className={css["table-text"]}>{item.price}</td>
          <td className={css["quantity"]}>
            <button
              onClick={() => {
                const action = changeProductBuyQuantity({
                  id: item.id,
                  quantity: -1,
                });
                dispatch(action);
              }}
              className={css["quantity-button"]}
            >
              -
            </button>
            <span className={css["quantity-number"]}>{item.quantity}</span>
            <button
              onClick={() => {
                const action = changeProductBuyQuantity({
                  id: item.id,
                  quantity: 1,
                });
                dispatch(action);
              }}
              className={css["quantity-button"]}
            >
              +
            </button>
          </td>
          <td className={css["table-text"]}>
            {handleTotal(+item.quantity, +item.price)}
          </td>
          <td>
            <button
              onClick={() => {
                const action = deleteFromCart(item.id);
                dispatch(action);
              }}
              className={css["delete-button"]}
            >
              DELETE
            </button>
          </td>
        </tr>
      );
    });
  };

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
          <tbody>{renderCart(cart)}</tbody>
        </table>
      </div>
      <div className={css["submit-button-container"]}>
        <button
          onClick={() => {
            try {
              const data: Orders = {
                orderDetail: [],
                email: getLocalStorage(EMAIL),
              };
              cart.map((item) => {
                const itemOrder = {
                  productId: item.id,
                  quantity: +item.quantity,
                };
                data.orderDetail.push(itemOrder);
              });
              console.log(data);
              sendOrders(data)
                .then((resp) => {
                  dispatch(emptyCart());
                })
                .catch((e) => {
                  console.log(e);
                });
            } catch (e) {
              console.log(e);
            }
          }}
          className={css["submit-button"]}
        >
          SUBMIT ORDER
        </button>
      </div>
    </div>
  );
}

export default Carts;
