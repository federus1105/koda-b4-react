import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/UseValidation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCurrentUser, login } from "../../redux/slice/authSlice";
import { loginUser } from "../../services/authService";
import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { profileUser } from "../../services/profileService";
import { jwtDecode } from "jwt-decode";

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
      dispatch(setCurrentUser(profile.result));

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
      <section className="min-h-screen bg-stone-50">
        <div className="flex justify-center min-h-screen">
          {/* Right Side - Form */}
          <section className="w-full lg:w-3/5 xl:w-2/3 flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-lg">
              {/* Logo & Brand */}
              <div className="flex items-center gap-3 mb-12">
                <img
                  src="/senja-kopi-kiri.png"
                  alt="Senja Kopi Logo"
                  className="w-16 h-16"
                />
                <p className="text-2xl font-semibold text-stone-800">
                  𝔖𝔢𝔫𝔧𝔞 𝔎𝔬𝔭𝔦-𝔎𝔦𝔯𝔦
                </p>
              </div>

              {/* Header */}
              <header className="mb-10">
                <h1 className="text-4xl font-bold text-brand mb-3">Login</h1>
                <p className="text-stone-600 text-lg">
                  Fill out the form correctly to access your account
                </p>
              </header>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-stone-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                      size={20}
                    />
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-stone-200 bg-white rounded-xl focus-brand focus:outline-none  text-stone-800"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-500 text-sm block mt-1">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-stone-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <KeyRound
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                      size={20}
                    />
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-3.5 border-2 border-stone-200 bg-white rounded-xl focus-brand focus:outline-none  text-stone-800"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 "
                    >
                      {isPasswordVisible ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-red-500 text-sm block mt-1">
                      {errors.password}
                    </span>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <Link to="../forgot">
                    <span className="text-stone-700 font-medium cursor-pointer">
                      Forgot Password?
                    </span>
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="cursor-pointer w-full bg-brand text-white py-4 rounded-xl font-semibold shadow-lg"
                >
                  Login
                </button>
              </form>

              {/* Register Link */}
              <p className="text-center mt-8 text-stone-600">
                Don't have an account?{" "}
                <Link to="../register">
                  <span className="text-stone-800 font-semibold cursor-pointer">
                    Register Now
                  </span>
                </Link>
              </p>

              {/* Divider */}
              <div className="relative text-center my-8">
                <hr className="border-t-2 border-stone-200" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-50 px-6 text-stone-500 font-medium">
                  Or continue with
                </span>
              </div>

              {/* Social Login Buttons */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="cursor-pointer flex items-center justify-center gap-3 bg-white border border-stone-200 rounded-xl py-3.5 shadow-sm hover:shadow-md">
                  <img src="/google.png" alt="Google" className="w-6 h-6" />
                  <span className="font-semibold text-stone-700">Google</span>
                </button>
                <button className="cursor-pointer flex items-center justify-center gap-3 bg-white border border-stone-200 rounded-xl py-3.5 shadow-sm hover:shadow-md">
                  <img src="/Facebook.svg" alt="Facebook" className="w-6 h-6" />
                  <span className="font-semibold text-stone-700">Facebook</span>
                </button>
              </section>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default Login;
