import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import ModalMenu from "../modal/ModalMenu";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";
import { History, Search, ShoppingCart } from "lucide-react";
const defaultProfilePhoto = "/default-profile.webp";

function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(Logout());
    toast.success("Anda Berhasil Logout");
    navigate("/auth/login");
  };

  return (
    <>
      <nav className="z-10 bg-gradient-to-br from-gray-900 to-gray-800 fixed top-0 w-full flex justify-between px-5 py-5 md:px-15 lg:px-30 duration-100">
        <div className="flex gap-35">
          <div className="flex gap-3">
            <img src="/iconv2.svg" alt="icon" />
            <img src="/logov2.svg" alt="logo" />
          </div>
          <div className="lg:flex gap-10 hidden lg:block">
            <button className="text-white cursor-pointer">
              <Link to="/">Home</Link>
            </button>
            <button className="text-white cursor-pointer">
              <Link to="/product">Product</Link>
            </button>
          </div>
        </div>

        <div className="flex items-center lg:gap-3 relative">
          <button onClick={() => setModalOpen(true)} className="lg:hidden">
            <img src="/menu-right.svg" alt="menu" className="w-8" />
          </button>

          {token ? (
            <div className="relative hidden lg:block">
              {/* Profile Avatar */}
              <img
                src={profile.photos || defaultProfilePhoto}
                alt="profile"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-11 h-11 rounded-full object-cover cursor-pointer"
              />

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 ">
                  <div className="flex flex-col p-3">
                    {/* EMAIL */}
                    <div className="px-3 py-2 rounded-lg bg-gray-50">
                      <p className="text-sm text-gray-700 font-medium break-all">
                        {profile.email}
                      </p>
                    </div>

                    {/* MENU ITEMS */}
                    <Link
                      to="/profile"
                      className="px-3 py-2 mt-2 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                      Profile
                    </Link>

                    {/* LOGOUT */}
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 text-left mt-1 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/auth/login">
                <button className="text-white border rounded-lg py-2 px-4 hidden lg:block cursor-pointer">
                  Sign In
                </button>
              </Link>
              <Link to="/auth/register">
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
