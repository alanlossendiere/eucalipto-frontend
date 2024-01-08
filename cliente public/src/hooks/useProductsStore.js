import { useDispatch, useSelector } from "react-redux";
import {
  onFilteredProducts,
  onLoadProducts,
} from "../store/productsSlice";
import { adminApi } from "../api/adminApi";

export const useProductStore = () => {
  const dispatch = useDispatch();

  const { products, activeProduct, filteredProducts } = useSelector(
    (state) => state.products
  );

  const startLoadingProducts = async () => {
    try {
      const { data } = await adminApi.get("/products");

      dispatch(onLoadProducts(data));
    } catch (error) {
      console.log(error);
    }
  };

  const startFilteredProducts = (selectedSize) => {
    try {
      const result = selectedSize
        ? products.filter((product) =>
            product.sizes.includes(`${selectedSize}`)
          )
        : products.map((product) => product);

      return dispatch(onFilteredProducts(result));
    } catch (error) {
      console.log(error);
    }
  };

  

  return {
    //  Propiedades

    products,
    activeProduct,
    filteredProducts,

    // Metodos

    startLoadingProducts,
    startFilteredProducts,
  };
};
