import React from "react";
import { Route, Routes } from "react-router-dom";

function Router() {
  return (
    <>
      <Routes>
        <Route path="auth">
          <Route index element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="Categories" element={<Categories />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
