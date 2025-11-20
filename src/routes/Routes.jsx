import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Forgot from "../pages/forgotpassword/Forgot";
import Home from "../pages/home/Home";
import Product from "../pages/product/Product";
import DetailProduct from "../pages/detailproduct/DetailProduct";
import Checkout from "../pages/checkoutproduct/Checkout";
import History from "../pages/Historyorder.jsx/History";
import DetailOrder from "../pages/detailorder/DetailOrder";
import Profile from "../pages/profile/Profile";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "../utils/PrivateRoute";
import { Slide } from "react-toastify";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/dashboardAdmin/Dashboard";
import ProductAdmin from "../pages/productAdmin/ProductAdmin";
import ModalCreate from "../components/productAdmin/ModalCreate";
import ResetPassword from "../pages/reset-password/ResetPassword";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="auth">
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot" element={<Forgot />} />
            <Route path="reset" element={<ResetPassword />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route
              path="/detailproduct/:id"
              element={
                <PrivateRoute redirectTo="/auth/login">
                  <DetailProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute redirectTo="/auth/login">
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoute redirectTo="/auth/login">
                  <History />
                </PrivateRoute>
              }
            />
            <Route
              path="/detailorder/:id"
              element={
                <PrivateRoute redirectTo="/auth/login">
                  <DetailOrder />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute redirectTo="/auth/login">
                  <Profile />
                </PrivateRoute>
              }
            />
          </Route>
          <Route element={<AdminLayout/>}>
             <Route path="/admin/dashboard" element={<Dashboard />} />
             <Route path="/admin/product" element={<ProductAdmin />} />
             <Route path="/admin/order" element={<ModalCreate/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        transition={Slide}
        theme="colored"
      />
    </>
  );
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export default Router;
