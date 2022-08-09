import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStripe = createAsyncThunk(
  `cart/getStripe`,
  async (cartTotalAmount) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/payment/", {
        total: Math.round(cartTotalAmount),
      });

      return data;
    } catch (error) {
      const message = error.message;
      return message;
    }
  }
);

let initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  payment: null,
};
if (window.sessionStorage.getItem("cartState")) {
  initialState = JSON.parse(window.sessionStorage.getItem("cartState"));
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      let total = 0;
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
      state.cartTotalQuantity = state.cartItems.length;
      state.cartItems.map((item) => (total += item.cartQuantity * item.price));
      state.cartTotalAmount = total;
      window.sessionStorage.setItem("cartState", JSON.stringify(state));
    },

    increaseQuantity(state, action) {
      let total = 0;
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      state.cartItems[itemIndex].cartQuantity += 1;
      state.cartItems.map((item) => (total += item.cartQuantity * item.price));
      state.cartTotalAmount = total;
      window.sessionStorage.setItem("cartState", JSON.stringify(state));
    },

    decreaseQuantity(state, action) {
      let total = 0;
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      state.cartItems[itemIndex].cartQuantity -= 1;
      if (state.cartItems[itemIndex].cartQuantity === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item.cartQuantity > 0
        );
      }
      state.cartTotalQuantity = state.cartItems.length;
      state.cartItems.map((item) => (total += item.cartQuantity * item.price));
      state.cartTotalAmount = total;
      window.sessionStorage.setItem("cartState", JSON.stringify(state));
    },
    removeItem(state, action) {
      let total = 0;

      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems.map((item) => (total += item.cartQuantity * item.price));
      state.cartTotalAmount = total;
      state.cartTotalQuantity = state.cartItems.length;
      window.sessionStorage.setItem("cartState", JSON.stringify(state));
    },
    clearState(state, action) {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getStripe.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getStripe.fulfilled, (state, action) => {
        state.payment = action.payload;
        state.status = "succeeded";
      })
      .addCase(getStripe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearState,
} = cartSlice.actions;
export default cartSlice;
