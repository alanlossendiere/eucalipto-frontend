import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { cartUiSlice } from "./cartUiSlice";
import { productsSlice } from "./productsSlice";

export const store = configureStore({
  reducer: {
    cartUi: cartUiSlice.reducer,
    products: productsSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
