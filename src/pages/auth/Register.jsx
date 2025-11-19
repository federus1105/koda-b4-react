import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";
import { toast } from "react-toastify";
import { registerUser } from "../../services/authService";
import { KeyRound, Mail, User } from "lucide-react";

function Register() {
  const { formData, errors, handleChange, validate } = useAuth("register");
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  // ---- TOGGLE FUNCTION ---
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // --- HANDLE SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Cek kembali form kamu!");
      return;
    }
    try {
      const data = await registerUser(formData);
      toast.success("Registrasi berhasil!");
      navigate("/auth/login");
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Terjadi kesalahan!, Silahkan coba lagi.");
    }
  };
  return (
    <>
      <section className="min-h-screen">
        <div className="flex justify-center">
          {/* right side image */}
          <section className="lg:w-1/3 flex items-center min-h-screen justify-center">
            <img
              src="/bg-register.svg"
              alt="Background image"
              className="hidden md:block w-full h-full object-cover"
            />
          </section>
          <section className="lg:bg-cover lg:w-2/3">
            <section className="flex h-full">
              <section className="px-5 flex justify-center flex-col w-full lg:px-20">
                <div className="flex items-center gap-2 md:mb-3">
                  <img src="/icon.svg" alt="icon" />
                  <img src="/Logo.svg" alt="" />
                </div>
                {/* header */}
                <header className="flex flex-col gap-2 my-3">
                  <h1 className="text-[#8E6447] text-xl font-medium">
                    Register
                  </h1>
                  <p className="text-gray-500 mt-2">
                    Fill out the form correctly
                  </p>
                </header>

                {/* input user email and pass */}
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="Fullname" className="font-medium">
                      Fullname
                    </label>
                    <div className="input-Fulname flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                      <User className="text-gray-400" />
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        placeholder="Enter Your Fullname"
                        className="w-full outline-none"
                        value={formData.fullname}
                        onChange={handleChange}
                      />
                    </div>
                    <span className="text-red-500 min-h-[1.5rem] text-sm">
                      {errors.fullname}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-medium">
                      Email
                    </label>
                    <div className="input-email flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                      <Mail className="text-gray-400" />
                      <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter Your Email"
                        className="w-full outline-none"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <span className="text-red-500 min-h-[1.5rem] text-sm">
                      {errors.email}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-medium">
                      Password
                    </label>
                    <div className="flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-1.5 w-full gap-3 h-11">
                      <KeyRound className="text-gray-400" />
                      <input
                        type={passwordVisibility.password ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Enter Your Password"
                        className="w-full outline-none"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <img
                        src={
                          passwordVisibility
                            ? "/Logo-Eye.svg"
                            : "/Logo-Eye-Close.svg"
                        }
                        alt=""
                        className="w-20 h-3.5 cursor-pointer"
                        onClick={() => togglePasswordVisibility("password")}
                      />
                    </div>
                    <span className="text-red-500 min-h-[1.5rem] text-sm">
                      {errors.password}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="confirmpassword" className="font-medium">
                      Confirm Password
                    </label>
                    <div className="flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                      <KeyRound className="text-gray-400" />
                      <input
                        type={
                          passwordVisibility.confirmPassword
                            ? "text"
                            : "password"
                        }
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Enter Your Password Again"
                        className="w-full outline-none"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <img
                        src={
                          passwordVisibility
                            ? "/Logo-Eye.svg"
                            : "/Logo-Eye-Close.svg"
                        }
                        alt=""
                        className="w-20 h-3.5 cursor-pointer"
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }
                      />
                    </div>
                    <span className="text-red-500 min-h-[1.5rem] text-sm">
                      {errors.confirmPassword}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-400 text-white h-10 rounded-md cursor-pointer mt-2"
                  >
                    Register
                  </button>
                  <p className="text-center mt-8 text-gray-500">
                    Have An Account ?{" "}
                    <Link to="../login">
                      <span className="text-orange-400">Login</span>
                    </Link>
                  </p>
                </form>
                <div className="relative text-center my-5">
                  <hr className="border-t border-gray-300" />
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-7 text-gray-400">
                    Or
                  </span>
                </div>
                {/* Sign In other */}
                <section className="flex gap-5 mt-5">
                  <button className="shadow-lg rounded-xl w-full h-13 border-gray-300 cursor-pointer flex items-center justify-center gap-5">
                    <img src="/Google.svg" alt="" />
                    <p className="hidden lg:block">Sign In With Google</p>
                  </button>
                  <button className="shadow-lg rounded-xl w-full h-13 border-gray-300 cursor-pointer flex items-center justify-center gap-5">
                    <img src="/Facebook.svg" alt="" />
                    <p className="hidden lg:block">Sign In With Facebook</p>
                  </button>
                </section>
              </section>
            </section>
          </section>
        </div>
      </section>
    </>
  );
}

export default Register;
