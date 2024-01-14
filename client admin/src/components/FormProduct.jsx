import React, { useEffect, useState } from "react";
import { useProductsStore } from "../hooks/useProductsStore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../api/adminApi";

export const FormProduct = () => {
  const navigate = useNavigate();

  const { activeProduct, startSavingProduct } = useProductsStore();

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: { ...activeProduct },
  });

  const [imageUrls, setImageUrls] = useState([]);


  const handleImageChange = async (event) => {
    event.preventDefault();

    const files = await event.target.files;

    const uploadPromises = Array.from(files).map(async (file) => {
      const fileName = `${file.name}_`;

      const formData = new FormData();

      formData.append("image", file, fileName);

      console.log(file);

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
    console.log(data);

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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="row">
        <div className="col-6">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="floatingName"
              {...register("name", { required: true, minLength: 3 })}
            />
            <label htmlFor="floatingName">Nombre del producto:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="floatingDescription"
              {...register("description", { required: true, minLength: 3 })}
            />
            <label htmlFor="floatingDescription">Description:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="floatingType"
              {...register("type", { required: true, minLength: 3 })}
            />
            <label htmlFor="floatingType">Tipo:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="number"
              id="floatingStock"
              {...register("stock", { required: true })}
            />
            <label htmlFor="floatingStock">Stock:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="number"
              id="floatingPrice"
              {...register("price", { required: true })}
            />
            <label htmlFor="floatingPrice">Precio:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="number"
              id="floatingSku"
              {...register("sku")}
            />
            <label htmlFor="floatingSku">SKU:</label>
          </div>
        </div>
        <div className="col-6">
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

          <label htmlFor="floatingSizes">Talles:</label>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              value="S"
              className="form-check-input"
              id="sizeS"
              {...register("sizes", { value: false })}
            />
            <label className="form-check-label" htmlFor="sizeS">
              S
            </label>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              value="M"
              className="form-check-input"
              id="sizeM"
              {...register("sizes", { value: false })}
            />
            <label className="form-check-label" htmlFor="sizeM">
              M
            </label>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              value="L"
              className="form-check-input"
              id="sizeL"
              {...register("sizes", { value: false })}
            />
            <label className="form-check-label" htmlFor="sizeL">
              L
            </label>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              value="XL"
              className="form-check-input"
              id="sizeXL"
              {...register("sizes", { value: false })}
            />
            <label className="form-check-label" htmlFor="sizeXL">
              XL
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="uploadFiles">
              Imagenes
            </label>
            {imageUrls.map((url, index) => (
              <img key={index} src={url.secure_url}></img>
            ))}
            <input
              type="file"
              className="form-control"
              id="uploadFiles"
              onChange={handleImageChange}
              multiple
            />
          </div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </>
  );
};
