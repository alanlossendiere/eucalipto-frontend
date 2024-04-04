import React, { useEffect, useRef, useState } from "react";
import { useProductsStore } from "../hooks/useProductsStore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../api/adminApi";
import { MdOutlineUpload } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const FormProduct = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef();

  const { activeProduct, startSavingProduct, startDeletingImage } =
    useProductsStore();

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: { ...activeProduct },
  });

  const [imageUrls, setImageUrls] = useState([]);

  const handleImageChange = async (event) => {
    event.preventDefault();

    const files = await event.target.files;

    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();

      formData.append("image", file);

      try {
        const { data } = await adminApi.post("products/images", formData);

        return {
          public_id: data.public_id,
          secure_url: data.secure_url,
        };
      } catch (error) {
        console.log("Error al subir la imagen", error);
      }
    });

    const imageUrls = await Promise.all(uploadPromises);

    setImageUrls(imageUrls);

    setValue(
      "image",
      [...imageUrls],
      imageUrls.filter((url) => url !== null)
    );
  };

  const handleExitImage = async (props) => {
    const id = props.public_id;
    const formData = { public_id: id };

    await startDeletingImage(formData);

    const imageUrlsModified = imageUrls.filter(
      (image) => image.public_id !== id
    );

    setImageUrls(imageUrlsModified);
  };
  const propertiesToSet = [
    "name",
    "_id",
    "description",
    "type",
    "price",
    "sku",
    "outstanding",
    "sold",
    "active",
    "createdAt",
    "stock",
    "image",
  ];

  const onSubmit = async (data) => {
    data.image = imageUrls;

    await startSavingProduct(data);

    navigate("/");
  };

  useEffect(() => {
    if (activeProduct) {
      propertiesToSet.forEach((property) => {
        setValue(property, activeProduct[property]);
      });
    }
    if (activeProduct.image) {
      const secureUrls = activeProduct.image.map((image) => image);
      setImageUrls(secureUrls);
      setValue("image", secureUrls);
    }
  }, [activeProduct, setValue]);

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  return (
    <>
      <div className="header">
        <div className="navForm d-flex align-items-center">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="logoutNav text-center pe-auto"
            color="#ddd"
          />
          <div className="titleNav px-3">Eucalipto DL</div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="productLayout">
        <div className="basic-edit-product">
          <div className="form-floating mb-3">
            <input
              placeholder=""
              className="form-control"
              id="floatingName"
              {...register("name", { required: true, minLength: 3 })}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="floatingName">Nombre</label>
          </div>
          <div className="form-floating mb-3">
            <input
              placeholder=""
              className="form-control"
              id="floatingDescription"
              {...register("description", { required: true, minLength: 3 })}
            />
            <label htmlFor="floatingDescription">Description</label>
          </div>
          <div className="form-floating mb-3">
            <input
              placeholder=""
              className="form-control"
              id="floatingType"
              {...register("type", { required: true, minLength: 3 })}
            />
            <label htmlFor="floatingType">Tipo</label>
          </div>
          <div className="form-floating mb-3">
            <input
              placeholder=""
              className="form-control"
              type="number"
              id="floatingStock"
              {...register("stock", { required: true })}
            />
            <label htmlFor="floatingStock">Stock</label>
          </div>
          <div className="form-floating mb-3">
            <input
              placeholder=""
              className="form-control"
              type="number"
              id="floatingPrice"
              {...register("price", { required: true })}
            />
            <label htmlFor="floatingPrice">Precio</label>
          </div>
          <div className="form-floating mb-3">
            <input
              placeholder=""
              className="form-control"
              type="number"
              id="floatingSku"
              {...register("sku")}
            />
            <label htmlFor="floatingSku">SKU</label>
          </div>
        </div>
        <div className="basic-edit-product">
          <div className="switch-group">
            <div className="mb-3 form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="floatingOutstanding"
                {...register("outstanding")}
              />
              <label className="form-check-label" htmlFor="floatingOutstanding">
                Destacado
              </label>
            </div>
            <div className=" mb-3 form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="floatingSold"
                {...register("sold")}
              />
              <label htmlFor="floatingSold" className="form-check-label">Sold</label>
            </div>
            <div className="mb-3 form-switch">
              <input
                className="form-check-input"
                id="floatingActive"
                type="checkbox"
                role="switch"
                {...register("active")}
              />
              <label className="form-check-label" htmlFor="floatingActive">
                Activo
              </label>
            </div>
          </div>

          <div name="" id="" className="input-group mb-3">
            <label htmlFor="inputGroupSelect01" className="input-group-text">
              Talles
            </label>
            <select
              id="inputGroupSelect01"
              className="form-select"
              {...register("sizes")}
            >
              <option value="" disabled>
                Seleccionar talle
              </option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
          <div className="mb-3 product-image">
            <div className="d-flex justify-content-end">
              <div className="btn btn-outline-primary my-2">
                <label className="form-label" htmlFor="uploadFiles">
                  Imagenes
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="uploadFiles"
                  onChange={handleImageChange}
                  multiple
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <MdOutlineUpload
                  onClick={() => fileInputRef.current.click()}
                  style={{ cursor: "pointer" }}
                  size={30}
                />
              </div>
            </div>
            <div className="image-input">
              <Slider {...settings} className="image-input">
                {imageUrls.map((props) => (
                  <img
                    src={props.secure_url}
                    key={props.public_id}
                    className="h-100"
                  />
                ))}
                {/* {imageUrls.map((props) => (
                  <>
                    <div>
                      <img src={props.secure_url}></img>
                    </div> */}
                {/* <div
                    className="exitImage"
                    onClick={() => handleExitImage(props)}
                    >
                    <span>X</span>
                    </div>
                  <img className="card-img pb-2" src={props.secure_url}></img> */}
                {/* </> */}
                {/* // ))} */}
              </Slider>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Crear
          <MdSend className="mx-2" />
        </button>
      </form>
    </>
  );
};
