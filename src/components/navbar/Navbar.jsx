import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import ModalMenu from "../modal/ModalMenu";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";

function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(Logout());
    toast.success("Anda Berhasil Logout");
    navigate("/auth/login");
  };

  const defaultProfilePhoto = "/default-profile.webp";

  return (
    <>
      <nav className="z-10 bg-black fixed top-0 w-full flex justify-between px-5 py-5 md:px-15 lg:px-30 duration-100">
        <div className="flex gap-35">
          <div className="flex gap-3">
            <img src="/iconv2.svg" alt="" />
            <img src="/logov2.svg" alt="" />
          </div>
          <div className="lg:flex gap-10 hidden lg:block">
            <Link to={"/"}>
              <button className="text-white cursor-pointer">Home</button>
            </Link>
            <Link to={"/product"}>
              <button className="text-white cursor-pointer">Product</button>
            </Link>
          </div>
        </div>

        <div className="flex items-center lg:gap-3 relative">
          <img src="/Search.svg" alt="" className="hidden lg:block" />
          <img src="/cart.svg" alt="" className="w-8" />
          <button onClick={() => setModalOpen(true)} className="lg:hidden">
            <img src="/menu-right.svg" alt="menu" className="w-8" />
          </button>

          {currentUser ? (
            <div className="relative hidden lg:block">
              <img
                src={currentUser.photo || defaultProfilePhoto}
                alt="profile"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
              />
              {dropdownOpen && (
                <div className="flex flex-col gap-3 py-3 px-4 absolute justify-center right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <div className=" text-gray-600">{currentUser.email}</div>
                  <div>
                    <Link to={"/profile"}>
                      <p>Profile</p>
                    </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>
      <ModalMenu isopen={modalOpen} onclose={() => setModalOpen(false)} />
    </>
  );
}

export default Navbar;
