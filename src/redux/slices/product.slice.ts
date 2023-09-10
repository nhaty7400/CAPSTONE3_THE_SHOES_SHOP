import { createSlice } from "@reduxjs/toolkit";
import { TCardItem } from "src/type";

type TState = {
  listProduct: TCardItem[];
  cart: any[];
};

const initialState: TState = {
  listProduct: [],
  cart: [],
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    // name + reducer: productSlice/setListProduct
    setListProduct: (state, action) => {
      //
      console.log({ action });
      // redux + immer: giúp chúng ta clone object, không cần quan tâm đến địa chỉ.
      // không cần dùng return
      state.listProduct = action.payload;
      // cách cũ
      //   return {
      //     ...state,
      //     listProduct: action.payload,
      //   };
    },
    addToCart: (state, action) => {
      const itemCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemCart) {
        itemCart.quantityBuy += 1;
        console.log(state.cart);
      } else {
        console.log("action", action);
        state.cart.push(action.payload);
      }
    },
  },
});

// action creator
export const { setListProduct, addToCart } = productSlice.actions;

export default productSlice.reducer;

// ----------- cách tạo ra create slice ----------
const __createSlice = () => {
  return {
    reducer: (state = initialState, action: any) => {
      switch (action.type) {
        case "": {
          //
        }
      }
    },
  };
};

const number = 1;
