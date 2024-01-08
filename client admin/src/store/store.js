import { configureStore } from "@reduxjs/toolkit";
import { adminSlice } from "./adminSlice";
import { productsSlice } from "./productsSlice";

export const store = configureStore({
  reducer: {
    admin: adminSlice.reducer,
    products: productsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
