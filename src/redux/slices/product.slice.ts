import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "src/pages/carts";
import { TCardItem } from "src/type";

type TState = {
  listProduct: TCardItem[];
  cart: Cart[];
  searchResult: any[];
  valueSearch: string;
  order: any;
};

const initialState: TState = {
  order: {},
  listProduct: [],
  cart: [],
  searchResult: [],
  valueSearch: "",
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    // name + reducer: productSlice/setListProduct
    setListProduct: (state, action) => {
      //
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
        itemCart.quantity += 1;
        alert("Số lượng sản phẩm được tăng thêm 1");
      } else {
        state.cart.push(action.payload);
        alert("Thêm sản phẩm vào giỏ hàng thành công");
      }
    },
    searchProduct: (state, action) => {
      let newArray = state.listProduct;
      let resultArray: any[] = [];
      if (action.payload.length <= 0) {
        resultArray = [];
      } else {
        action.payload = action.payload.toLowerCase();
        resultArray = newArray.filter(
          (item) => item.name.toLowerCase().indexOf(action.payload) > -1,
        );
      }
      state.searchResult = resultArray;
      state.valueSearch = action.payload;
    },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    changeProductBuyQuantity: (state, action) => {
      const { quantity, id } = action.payload;
      const itemCart = state.cart.find((item) => item.id === id);
      if (!itemCart) return state;
      if (itemCart.quantity === 1 && quantity === -1) {
        state.cart = state.cart.filter((item) => item.id !== id);
      }
      itemCart.quantity += quantity;
    },
    emptyCart: (state) => {
      state.cart = [];
    },
  },
});

// action creator
export const {
  setListProduct,
  addToCart,
  searchProduct,
  deleteFromCart,
  changeProductBuyQuantity,
  emptyCart,
} = productSlice.actions;

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
