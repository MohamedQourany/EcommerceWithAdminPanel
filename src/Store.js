import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CounterSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
