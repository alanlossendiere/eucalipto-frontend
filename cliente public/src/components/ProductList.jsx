import React from "react";
import { useCartUiStore } from "../hooks/useCartUiStore";

export const ProductList = (data) => {
  const { startAddingProduct } = useCartUiStore();

  const onAddCart = async () => {
    const newData = {
      id: data._id,
      sizes: data.sizes,
      name: data.name,
      price: data.price,
      quantity: 1,
      total: data.price,
      type: data.type,
      imgSrc: data.image[0].secure_url,
      stock: data.stock,
      sku: data.sku,
    };

    await startAddingProduct(newData);
  };

  return (
    <>
      <div className="card d-inline-block text-center">
        <img
          src={data.image[0].secure_url}
          alt={data.name}
          className="cardImg"
        />
        <div className="card-body">
          <div className="card-title">{data.name}</div>
          <div className="cardTextPrice">$ {data.price}</div>
          <hr />
          <div className="addCart" onClick={onAddCart}>
            <div className="card-text">Añadir al carrito</div>
          </div>
        </div>
      </div>
    </>
  );
};
