import { createSlice } from "@reduxjs/toolkit";

export const cartUiSlice = createSlice({
  name: "cartUi",
  initialState: {
    products: [],
    isOpen: false,
    totalAmount: 0,
    totalPrice: 0,
  },
  reducers: {
    onOpenCartUi: (state) => {
      state.isOpen = true;
    },
    onCloseCartUi: (state) => {
      state.isOpen = false;
    },
    onAddProduct: (state, { payload = {} }) => {
      const existProduct = state.products.find(
        (product) => product.id === payload.id
      );

      if (existProduct) {
        const newQuantity = existProduct.quantity + payload.quantity;

        if (newQuantity <= existProduct.stock) {
          existProduct.quantity = newQuantity;
          existProduct.total += payload.total;

          state.totalAmount += payload.quantity;
          state.totalPrice += payload.price;
        } else {
          console.log("No hay stock de", existProduct.name);
        }
      } else {
        if (payload.quantity <= payload.stock) {
          state.products.push(payload);
          state.totalAmount += payload.quantity;
          state.totalPrice += payload.price;
        } else {
          console.log("No hay stocks de", payload.name);
        }
      }
    },
    onDeleteProduct: (state, { payload }) => {
      const deletedProducts = state.products.find(
        (product) => product.id === payload
      );

      if (deletedProducts) {
        state.totalAmount -= deletedProducts.quantity;
        state.totalPrice -= deletedProducts.total;
      }
      state.products = state.products.filter(
        (product) => product.id !== payload
      );
    },
  },
});

export const { onOpenCartUi, onCloseCartUi, onAddProduct, onDeleteProduct } =
  cartUiSlice.actions;
