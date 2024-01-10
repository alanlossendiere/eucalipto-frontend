import React from "react";
import { useCartUiStore } from "../hooks/useCartUiStore";

export const CartItem = (product) => {
  console.log(product.stock);

  const { startDeletingProduct } = useCartUiStore();

  const { name, sizes, type, price, id, imgSrc, quantity, stock } = product;

  const handleExitProductCart = () => {
    startDeletingProduct(id);
  };

  return (
    <div className="cartItem">
      <button
        title={`Eliminar del carrito ${name}`}
        className="exitproductCart"
        onClick={handleExitProductCart}
      >
        <span>X</span>
      </button>
      <img src={imgSrc} alt={name} className="cartImg" />
      <div className="cartDetails">
        <p className="cartTitle">{name}</p>
        <p className="cartDescription">
          Talle: {sizes} | {type}
        </p>
        <p className="cartQuantity">
          Cantidad: {quantity} | {stock}
        </p>
      </div>
      <div className="cartProductPrice">
        <p cartPrice>$ {price}</p>
      </div>
    </div>
  );
};
