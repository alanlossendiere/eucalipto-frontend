import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormProduct } from "../components/FormProduct";
import { useProductsStore } from "../hooks/useProductsStore";

export const AdminProduct = () => {
  const { id } = useParams();

  const { startLoadingProduct } = useProductsStore();

  useEffect(() => {
    startLoadingProduct(id);
  }, []);
  

  return (
    <>
      <FormProduct />
    </>
  );
};
