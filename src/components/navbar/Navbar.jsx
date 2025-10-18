import React, { useState } from "react";
import { Link } from "react-router";
import ModalMenu from "../modal/ModalMenu";

function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  // const [active, setActive] = useState("Home");
  // const location = useLocation();

  // Cek apakah path sekarang adalah "/"
  // const isHome = location.pathname === "/";

  // const navItems = ["Home", "Product"];

  return (
    <>
      <nav className="z-10 backdrop-blur-lg fixed top-0 w-full flex justify-between px-5 py-5 md:px-15 lg:px-30 duration-100">
        <div className="flex gap-35">
          <div className="flex gap-3">
            <img src="/iconv2.svg" alt="" />
            <img src="/logov2.svg" alt="" />
          </div>
          <div className="lg:flex gap-10 hidden lg:block">
            {/* {navItems.map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : "/product"}
                onClick={() => setActive(item)}
                className={`text-white cursor-pointer pb-1 border-b-2 transition-all duration-300 ${
                  active === item ? "border-orange-500" : "border-transparent"
                }`}
              >
                {item}
              </Link>
            ))} */}
            <Link to={"/"}>
              <button className="text-white cursor-pointer">Home</button>
            </Link>
            <Link to={"/product"}>
              <button className="text-white cursor-pointer">Product</button>
            </Link>
          </div>
        </div>
        <div className="flex gap-3 lg:gap-5">
          <img src="/Search.svg" alt="" className="hidden lg:block" />
          <img src="/cart.svg" alt="" className="w-8" />
          <button onClick={() => setModalOpen(true)} className="lg:hidden">
            <img src="/menu-right.svg" alt="menu" className="w-8" />
          </button>
          <Link to={"/auth/login"}>
            <button className="text-white border rounded-lg py-2 px-4 hidden lg:block cursor-pointer">
              Signin
            </button>
          </Link>
          <Link to={"/auth/register"}>
            <button className="bg-orange-400 rounded-lg py-2 px-4 hidden lg:block cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>
      <ModalMenu isopen={modalOpen} onclose={() => setModalOpen(false)} />
    </>
  );
}

export default Navbar;
