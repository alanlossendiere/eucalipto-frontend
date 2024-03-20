import React, { useEffect, useRef, useState } from "react";
import { useProductsStore } from "../hooks/useProductsStore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../api/adminApi";
import { MdOutlineUpload } from "react-icons/md";
import { ImageForm } from "./ImageForm";

export const FormProduct = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef();

  const { activeProduct, startSavingProduct, startDeletingImage } =
    useProductsStore();

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: { ...activeProduct },
  });

  const [imageUrls, setImageUrls] = useState([]);

  const [title, setTitle] = useState("");

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
  console.log(imageUrls);
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

    console.log(data);

    await startSavingProduct(data);

    navigate("/");
  };

  useEffect(() => {
    if (activeProduct) {
      propertiesToSet.forEach((property) => {
        setValue(property, activeProduct[property]);
      });
      setTitle(activeProduct.name);
    }
    if (activeProduct.image) {
      const secureUrls = activeProduct.image.map((image) => image);
      setImageUrls(secureUrls);
      setValue("image", secureUrls);
    }
  }, [activeProduct, setValue]);

  return (
    <>
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
                Destacado:
              </label>
            </div>
            <div className=" mb-3 form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="floatingSold"
                {...register("sold")}
              />
              <label htmlFor="floatingSold">Sold</label>
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
                Activo:
              </label>
            </div>
          </div>
          <div className="form-check">
            <input
              type="radio"
              value="XL"
              className="form-check-input"
              id="sizeXL"
              {...register("sizes")}
              checked={activeProduct.sizes === "XL"}
            />
            <label className="form-check-label" htmlFor="sizeXL">
              XL
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              value="L"
              className="form-check-input"
              id="sizeL"
              {...register("sizes")}
              checked={activeProduct.sizes === "L"}
            />
            <label className="form-check-label" htmlFor="sizeL">
              L
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              value="S"
              className="form-check-input"
              id="sizeS"
              {...register("sizes")}
              checked={activeProduct.sizes === "S"}
            />
            <label className="form-check-label" htmlFor="sizeS">
              S
            </label>
          </div>
          <div className="mb-3 product-image">
            <label className="form-label" htmlFor="uploadFiles">
              Imagenes
            </label>
            <div className="image-input">
              {imageUrls.map((props) => (
                <>
                  <div
                    className="exitImage"
                    onClick={() => handleExitImage(props)}
                  >
                    <span>X</span>
                  </div>
                  <img className="card-img" src={props.secure_url}></img>
                </>
              ))}
            </div>
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
          <button type="submit">Enviar</button>
        </div>
      </form>
    </>
  );
};
