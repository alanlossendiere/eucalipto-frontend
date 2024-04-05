import React from "react";
import { useCartUiStore } from "../hooks/useCartUiStore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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


  const settings = {
    arrows: false,
    autoplaySpeed: 2000,
    autoplay: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  return (
    <>
      <div className="card d-inline-block text-center">
        <Slider {...settings} className="cardImg">
          {data.image.map((props) => (
            <img src={props.secure_url} className="cardImg" />
          ))}
        </Slider>
        {/* <img
          src={data.image[0].secure_url}
          alt={data.name}
          className="cardImg"
        /> */}
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
