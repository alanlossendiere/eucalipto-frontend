import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../page/HomePage";
import { ProductPage } from "../page/ProductPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/:id" element={<ProductPage />} />
    </Routes>
  );
};
