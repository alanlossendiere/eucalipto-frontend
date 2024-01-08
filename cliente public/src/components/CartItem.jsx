import React from "react";
import { useCartUiStore } from "../hooks/useCartUiStore";

export const CartItem = (product) => {
  const { startDeletingProduct } = useCartUiStore();

  const { name, sizes, type, price } = product;

  const id = product._id;

  const image = product.image.secure_url;

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
      <img src={image} alt={name} className="cartImg" />
      <div className="cartDetails">
        <p className="cartTitle">{name}</p>
        <p className="cartDescription">
          Talle: {sizes} | {type}
        </p>
        <p className="cartQuantity">dsa</p>
      </div>
      <div className="cartProductPrice">
        <p cartPrice>$ {price}</p>
      </div>
    </div>
  );
};
