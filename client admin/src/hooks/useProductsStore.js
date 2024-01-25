import { useDispatch, useSelector } from "react-redux";
import { adminApi } from "../api/adminApi";
import {
  onCreateProduct,
  onDeleteProduct,
  onLoadProduct,
  onLoadProducts,
  onSetActiveProduct,
  onUpdateProduct,
} from "../store/productsSlice";
import Swal from "sweetalert2";

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

  const startDeletingProduct = async (_id) => {
    try {
      await adminApi.delete(`/products/${_id}`);
      dispatch(onDeleteProduct());
      Swal.fire("Eliminada", "Se elimino correctamente", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "No se pudo eliminar", "error");
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
        await adminApi.put(`/products/${id}`, product);

        dispatch(onUpdateProduct({ ...product }));
      } else {
        await adminApi.post("/products", product);

        dispatch(onCreateProduct({ ...product }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("No se pudo crear", error.response.data.message, "error");
    }
  };

  const startUploadingImg = async (img) => {
    try {
      const { data } = await adminApi.post("/products/images", img);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const startDeletingImage = async (data) => {
    try {
      console.log(data);
      await adminApi.delete(`/products/images`, {data});
    } catch (error) {
      console.log(error);
    }
  };

  return {
    // Propiedades

    products,
    activeProduct,

    // Metodos

    startDeletingImage,
    startLoadingProducts,
    setActiveProduct,
    startLoadingProduct,
    startSavingProduct,
    startDeletingProduct,
    startUploadingImg,
  };
};
