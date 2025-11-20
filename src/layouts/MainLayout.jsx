import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { ScrollToTop } from "../routes/Routes";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop/>
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
