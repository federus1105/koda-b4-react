import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/UseValidation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { currentUser, login } from "../../redux/slice/authSlice";
import { loginUser } from "../../services/authService";
import { KeyRound, Mail } from "lucide-react";
import { profileUser } from "../../services/profileClient";
import {jwtDecode} from 'jwt-decode';

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { formData, errors, handleChange, validate } = useLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // toogle password visibiliy
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      const data = await loginUser(formData);
      dispatch(
        login({
          token: data.result.token,
        })
      );

      // --- DECODE TOKEN GET ROLE ---
      const decodedToken = jwtDecode(data.result.token);
      const role = decodedToken.role;

      // --- FETCH PROFILE USER ---
      const profile = await profileUser(data.result.token);
      dispatch(currentUser(profile.result));

      toast.success("Login berhasil!");
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/"); //
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi kesalahan!, Silahkan coba lagi.");
    }
  };
  return (
    <>
      <section className="min-h-screen">
        <div className="flex justify-center">
          {/* --- right side image --- */}
          <section className="lg:w-1/3 flex items-center min-h-screen justify-center">
            <img
              src="/bg-register.svg"
              alt="Background image"
              className="hidden md:block w-full h-full object-cover"
            />
          </section>
          <section className="lg:bg-cover lg:w-2/3">
            <section className="flex h-full">
              <section className="px-5 flex justify-center flex-col w-full lg:px-30">
                <div className="flex items-center gap-2 md:mb-10">
                  <img src="/icon.svg" alt="icon" />
                  <img src="/Logo.svg" alt="" />
                </div>
                {/* --- header --- */}
                <header className="flex flex-col gap-2 my-3">
                  <h1 className="text-[#8E6447] text-xl font-medium">Login</h1>
                  <p className="text-gray-500 mt-2">
                    Fill out the form correctly
                  </p>
                </header>

                {/* --- input user email and pass --- */}
                <form onSubmit={handleSubmit}>
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
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Enter Your Password"
                        className="w-full outline-none"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <img
                        src={
                          isPasswordVisible
                            ? "/Logo-Eye.svg"
                            : "/Logo-Eye-Close.svg"
                        }
                        alt=""
                        className="w-20 h-3.5 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    </div>
                    <span className="text-red-500 min-h-[1.5rem] text-sm">
                      {errors.password}
                    </span>
                  </div>
                  <Link to={"../forgot"}>
                    <p className="text-right mb-5 text-orange-400">
                      Lupa Password?
                    </p>
                  </Link>
                  <button
                    type="submit"
                    className="w-full bg-orange-400 text-white h-10 rounded-md cursor-pointer mt-2"
                  >
                    Login
                  </button>
                </form>
                <p className="text-center mt-8 text-gray-500">
                  Have An Account ?{" "}
                  <Link to="../register">
                    <span className="text-orange-400">Register</span>
                  </Link>
                </p>
                <div className="relative text-center my-8">
                  <hr className="border-t border-gray-300" />
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-7 text-gray-400">
                    Or
                  </span>
                </div>

                {/* ---- Sign In other ---- */}
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

export default Login;
