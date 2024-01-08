import React from "react";
import { BsCart4 } from "react-icons/bs";
import { useCartUiStore } from "../hooks/useCartUiStore";

export const CartButton = () => {
  const { startOpeningCart, products } = useCartUiStore();

  const handleOpenCart = () => {
    startOpeningCart();
  };

  const productosCart = products.length;

  return (
    <>
      <button className="btn cartButton" onClick={handleOpenCart}>
        <BsCart4 size={30} color="white" />
        <div className="productsCartQuantity">{productosCart}</div>
      </button>
    </>
  );
};
