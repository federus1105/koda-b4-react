import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebarAdmin/Sidebar";
import NavbarAdmin from "../components/navbarAdmin/Navbar";
import { ScrollToTop } from "../routes/Routes";

function AdminLayout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        
        <ScrollToTop/>
        <NavbarAdmin />

        <main className="min-h-screen flex">
          <Sidebar />
          <div className="w-full p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminLayout;
