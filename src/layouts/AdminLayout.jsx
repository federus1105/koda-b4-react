import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebarAdmin/Sidebar";
import NavbarAdmin from "../components/navbarAdmin/Navbar";
import { ScrollToTop } from "../routes/Routes";

function AdminLayout() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <NavbarAdmin />

        <main className="min-h-screen flex">
          <Sidebar />
          <div className="w-full p-10">
            {loading && (
              <div className="loader-overlay">
                <div className="flex flex-col items-center">
                  <div className="loader"></div>
                  <span className="loader-text">Loading...</span>
                </div>
              </div>
            )}
            <Outlet context={{ setLoading }} />
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminLayout;
