// CounterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  cart: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const productId = action.payload.id;
      const product = state.cart.find((item) => item.id === productId);

      if (!product) {
        const { id, productName, price, image } = action.payload;
        state.cart.push({ id, productName, price, quantity: 1, image });
      } else {
        product.quantity++;
      }
    },
    increaseQ: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    decrease: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product) {
        product.quantity = product.quantity - 1; // Increase the quantity for the specific item
      }
      if (product.quantity === 0) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }
    },
    calculateTotal: (state) => {
      state.total = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addItem, increaseQ, decrease, removeFromCart, calculateTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
