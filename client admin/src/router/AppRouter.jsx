import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminProducts } from "../pages/AdminProducts";
import { LoginPage } from "../pages/LoginPage";
import { CheckingPage } from "../pages/CheckingPage";
import { AdminProduct } from "../pages/AdminProduct";
import { NewProduct } from "../pages/NewProduct";
import { useUserStore } from "../hooks/useUserStore";

export const AppRouter = () => {
  const { authStatus } = useUserStore();


  // const authStatus = "checking"

  if (authStatus === "checking") {
    return <CheckingPage />;
  }

  return (
    <Routes>
      {authStatus === "authenticated" ? (
        <>
          <Route path="/" element={<AdminProducts />} />
          <Route path="/:id" element={<AdminProduct />} />
          <Route path="/nuevo-producto" element={<NewProduct />} />
        </>
      ) : (
        <>
          <Route path="/*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
        </>
      )}
    </Routes>
  );
};
