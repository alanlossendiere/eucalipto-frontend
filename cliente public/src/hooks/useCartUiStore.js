import { useDispatch, useSelector } from "react-redux";
import {
  onAddProduct,
  onCloseCartUi,
  onDeleteProduct,
  onOpenCartUi,
} from "../store/cartUiSlice";

export const useCartUiStore = () => {
  const dispatch = useDispatch();

  const { products, isOpen, totalAmount, totalPrice } = useSelector(
    (state) => state.cartUi
  );

  const startOpeningCart = async () => {
    try {
      dispatch(onOpenCartUi());
    } catch (error) {
      console.log(error);
    }
  };

  const startClosingCart = async () => {
    try {
      dispatch(onCloseCartUi());
    } catch (error) {
      console.log(error);
    }
  };

  const startAddingProduct = async (data) => {
    try {
      dispatch(onOpenCartUi());
      dispatch(onAddProduct(data));
    } catch (error) {
      console.log(error);
    }
  };

  const startDeletingProduct = async (id) => {
    try {
      dispatch(onDeleteProduct(id));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    // Properties

    products,
    isOpen,
    totalAmount,
    totalPrice,

    // Methods

    startOpeningCart,
    startClosingCart,
    startAddingProduct,
    startDeletingProduct,
  };
};
