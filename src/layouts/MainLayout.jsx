import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { ScrollToTop } from "../routes/Routes";
import { useState } from "react";

function MainLayout() {
    const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />

      <main className="flex-grow">
        {loading && (
          <div className="loader-overlay">
            <div className="flex flex-col items-center">
              <div className="loader"></div>
              <span className="loader-text">Loading...</span>
            </div>
          </div>
        )}
        <Outlet context={{ setLoading }} />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
