import { createSlice } from "@reduxjs/toolkit";

// const tempProducts = {
//   _id: "64ea76977106cd9325b1fdsa04d",
//   name: "Camperon",
//   description: "Campera de cuero",
//   type: "Campera",
//   price: 2000,
//   sku: 46129812,
//   sizes: ["XL", "XXL"],
//   createdAt: "2023-08-26T22:03:05.905+00:00",
//   outstanding: true,
//   sold: true,
// };

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: true,
    products: [],
    activeProduct: [],
  },
  reducers: {
    onLoadProducts: (state, { payload = [] }) => {
      state.isLoading = false;
      state.products = payload; //Esta es la otra forma exactamente igual

      // payload.forEach((product) => {
      //   const exist = state.products.some(
      //     (dbProduct) => dbProduct._id === product._id
      //   );
      //   if (!exist) {
      //     state.products.push(product);
      //   }
      // });
    },
    onSetActiveProduct: (state, { payload = {} }) => {
      (state.isLoading = false), (state.activeProduct = payload);
    },
    onDeleteProduct: (state) => {
      state.isLoading = false;
      if (state.activeProduct) {
        state.products = state.products.filter(
          (product) => product._id !== state.activeProduct._id
        );
      }
      state.activeProduct = null;
    },
    onAddNewProduct: (state, { payload }) => {
      state.isLoading = false;
      state.products.push(payload);
      state.activeProduct = null;
    },
    onLoadProduct: (state, { payload = {} }) => {
      (state.isLoading = false), (state.activeProduct = payload);
    },
    onCleanProducts: (state) => {
      state.products = [];
    },
    onLoadingProducts: (state) => {
      state.isLoading = true;
    },
    onUpdateProduct: (state, { payload }) => {
      state.products = state.products.map((product) => {
        if (product._id === payload.id) {
          return payload;
        }
        return product;
      });
    },
    onCreateProduct: (state, { payload }) => {
      state.products.push(payload)
      state.activeProduct = {}
    },
  },
});

export const {
  onLoadProducts,
  onSetActiveProduct,
  onDeleteProduct,
  onAddNewProduct,
  onLoadProduct,
  onCleanProducts,
  onLoadingProducts,
  onUpdateProduct,
  onCreateProduct,
} = productsSlice.actions;
