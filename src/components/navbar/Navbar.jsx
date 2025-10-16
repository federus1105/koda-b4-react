import React, { useState } from "react";
import { Link } from "react-router";

function Navbar() {
  const [active, setActive] = useState("Home");

  const navItems = ["Home", "Product"];

  return (
    <>
      <nav className="bg-transparent z-10 fixed top-0 w-full flex justify-between pr-8 pl-5 py-5 md:px-15 lg:px-30">
        <div className="flex gap-35">
          <div className="flex gap-3">
            <img src="/iconv2.svg" alt="" />
            <img src="/logov2.svg" alt="" />
          </div>
          <div className="lg:flex gap-10 hidden lg:block">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`text-white cursor-pointer pb-1 border-b-2 transition-all duration-300 ${
                  active === item ? "border-orange-500" : "border-transparent"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3 lg:gap-5">
          <img src="/Search.svg" alt="" className="hidden lg:block" />
          <img src="/cart.svg" alt="" />
          <img src="/menu-right.svg" alt="" className="lg:hidden" />
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
    </>
  );
}

export default Navbar;
