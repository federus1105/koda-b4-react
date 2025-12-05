import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/UseValidation";
import { toast } from "react-toastify";
import { registerUser } from "../../services/authService";
import { Eye, EyeOff, KeyRound, Mail, User } from "lucide-react";

function Register() {
  const { formData, errors, handleChange, validate } = useRegister();
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
                <h1 className="text-4xl font-bold text-brand mb-3">
                  Register
                </h1>
                <p className="text-stone-600 text-lg">
                  Fill out the form correctly to create your account
                </p>
              </header>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Fullname Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-semibold text-stone-700"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                      size={20}
                    />
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-stone-200 bg-white rounded-xl focus-brand focus:outline-none text-stone-800"
                      value={formData.fullname}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.fullname && (
                    <span className="text-red-500 text-sm block mt-1">
                      {errors.fullname}
                    </span>
                  )}
                </div>

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
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-stone-200 bg-white rounded-xl focus-brand focus:outline-none text-stone-800"
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
                      type={passwordVisibility.password ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-3.5 border-2 border-stone-200 bg-white rounded-xl focus-brand focus:outline-none text-stone-800"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("password")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {passwordVisibility.password ? (
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

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-stone-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <KeyRound
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                      size={20}
                    />
                    <input
                      type={
                        passwordVisibility.confirmPassword ? "text" : "password"
                      }
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Enter your password again"
                      className="w-full pl-12 pr-12 py-3.5 border-2 border-stone-200 bg-white rounded-xl focus-brand focus:outline-none text-stone-800"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {passwordVisibility.confirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm block mt-1">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-brand cursor-pointer text-white py-4 rounded-xl font-semibold shadow-lg"
                >
                  Register
                </button>
              </form>

              {/* Login Link */}
              <p className="text-center mt-8 text-stone-600">
                Already have an account?{" "}
                <Link to="../login">
                  <span className="text-stone-700 font-semibold cursor-pointer">
                    Login
                  </span>
                </Link>
              </p>
              {/* Divider */}
              <div className="relative text-center my-8">
                <hr className="border-t-2 border-stone-200" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-50 px-6 text-stone-500 font-medium">
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

export default Register;
