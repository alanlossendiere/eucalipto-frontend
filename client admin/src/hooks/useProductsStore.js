import { useDispatch, useSelector } from "react-redux";
import { adminApi } from "../api/adminApi";
import {
  onCleanProducts,
  onCreateProduct,
  onDeleteProduct,
  onLoadProduct,
  onLoadProducts,
  onLoadingProducts,
  onSetActiveProduct,
  onUpdateProduct,
} from "../store/productsSlice";

export const useProductsStore = () => {
  const dispatch = useDispatch();

  const { products, activeProduct } = useSelector((state) => state.products);

  const startLoadingProducts = async () => {
    try {
      const { data } = await adminApi.get("/products");
      dispatch(onLoadProducts(data));
    } catch (error) {
      console.log(error);
    }
  };

  const setActiveProduct = async (data) => {
    try {
      dispatch(onSetActiveProduct(data));
    } catch (error) {
      console.log(error);
    }
  };

  const startDeletingProduct = async (props) => {
    try {
      const data = {
        image1: props.image[0].public_id
      };

      await adminApi.delete(`/products/${props._id}`, { data });
      dispatch(onDeleteProduct());
    } catch (error) {
      console.log(error);
    }
  };

  const startLoadingProduct = async (_id) => {
    try {
      const { data } = await adminApi.get(`/products/${_id}`);
      dispatch(onLoadProduct(data));
    } catch (error) {
      console.log(error);
    }
  };

  const startSavingProduct = async (product) => {
    const id = product._id;

    try {
      if (id) {
        const { data } = await adminApi.put(`/products/${id}`, product);

        dispatch(onUpdateProduct({ ...product }));

        console.log(data);
        console.log({ ...product });
      } else {
        const { data } = await adminApi.post("/products", product);

        dispatch(onCreateProduct({ ...product }));

        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    // Propiedades

    products,
    activeProduct,

    // Metodos

    startLoadingProducts,
    setActiveProduct,
    startLoadingProduct,
    startSavingProduct,
    startDeletingProduct,
  };
};
