import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    activeProduct: [],
    isLoading: true,
    filteredProducts: [],
  },
  reducers: {
    onLoadProducts: (state, { payload = [] }) => {
      state.isLoading = false;
      state.products = payload;
      state.products = state.products.filter(
        (product) => product.active === true
      );
    },
    onSelectSize: (state, { payload }) => {
      state.isLoading = true;
      state.selectedSize = payload;
    },
    onFilteredProducts: (state, { payload = {} }) => {
      state.isLoading = false;
      state.filteredProducts = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onLoadProducts,
  onFilteredProducts,
  onSelectSize,
  onDeleteFilteredProduct,
  onChangingBooleanProduct,
} = productsSlice.actions;
