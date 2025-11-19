import React from "react";
import { baseClass, activeClass } from "../../utils/styling";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  GlassWater,
  Handbag,
  LayoutDashboard,
  LogOut,
  Users,
} from "lucide-react";

function Sidebar() {
  const isLoggedIn = useSelector((state) => state.auth);
  return (
    <>
      {isLoggedIn && (
        <aside className="hidden lg:flex lg:w-1/5 min-h-screen border-r-1 border-gray-300">
          <nav className="flex flex-col gap-2 p-5 w-full">
            <NavLink
              className={({ isActive }) =>
                isActive ? `${baseClass} ${activeClass}` : baseClass
              }
              to="/admin/dashboard"
            >
              <LayoutDashboard size={28} />
              <h1 className="font-light">Dashboard</h1>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${baseClass} ${activeClass}` : baseClass
              }
              to="/admin/product"
            >
              <GlassWater size={28} />
              <h1 className="font-light">Product</h1>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${baseClass} ${activeClass}` : baseClass
              }
              to="/admin/order"
            >
              <Handbag size={28} />
              <h1 className="font-light">Order</h1>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${baseClass} ${activeClass}` : baseClass
              }
              to="/summary"
            >
              <Users size={28} />
              <h1 className="font-light">User</h1>
            </NavLink>
            <button
              className="flex gap-5 cursor-pointer text-red-600 items-center p-3 rounded-xl hover:bg-orange-400 hover:text-white"
              //   onClick={openModal}
            >
              <LogOut className="rotate-180" />
              <h3>Keluar</h3>
            </button>
          </nav>
        </aside>
      )}
    </>
  );
}

export default Sidebar;
