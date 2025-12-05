import { Eye, EyeOff, KeyRound, QrCode } from "lucide-react";
import React, { useState } from "react";
import { useResetPassword } from "../../hooks/UseValidation";
import { resetPassword } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const { formData, errors, handleChange, validate } = useResetPassword();
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();

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
      const payload = {
        token: formData.token,
        new_password: formData.password,
      };
      const resp = await resetPassword(payload);
      toast.success("Password berhasil di reset");
      navigate("/auth/login");
    } catch (error) {
      console.error("reset error:", error);
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
                  Reset Password
                </h1>
                <p className="text-stone-600 text-lg">
                  We will send new password to your email. Fill out the form
                  correctly.
                </p>
              </header>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* OTP Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="token"
                    className="block text-sm font-semibold text-stone-700"
                  >
                    OTP Code
                  </label>
                  <div className="relative">
                    <QrCode
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                      size={20}
                    />
                    <input
                      type="text"
                      id="token"
                      name="token"
                      placeholder="Enter your OTP"
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-stone-200 bg-white rounded-xl focus-brand focus:outline-none text-stone-800"
                      value={formData.token}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.token && (
                    <span className="text-red-500 text-sm block mt-1">
                      {errors.token}
                    </span>
                  )}
                </div>

                {/* New Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-stone-700"
                  >
                    New Password
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
                      placeholder="Enter your new password"
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

                {/* Confirm New Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-stone-700"
                  >
                    Confirm New Password
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
                  className="cursor-pointer w-full bg-brand text-white py-4 rounded-xl font-semibold"
                >
                  Submit
                </button>
              </form>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-amber-50 border-2 border-brand rounded-xl">
                <p className="text-sm text-amber-900">
                  <span className="font-semibold">Note:</span> The code will
                  expire in 15 minutes.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default ResetPassword;
