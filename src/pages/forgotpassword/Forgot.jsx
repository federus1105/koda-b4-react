import React from "react";
import { useForgot } from "../../hooks/UseValidation";
import { toast } from "react-toastify";
import { forgotPassword } from "../../services/authService";
import { ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function Forgot() {
  const { formData, errors, handleChange, validate } = useForgot();

  // --- HANDLE SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      const resp = await forgotPassword(formData);
      console.log(resp);
      toast.success("Token Reset password telah dikirim!");
    } catch (error) {
      console.error("forgot error:", error);
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
                <h1 className="text-4xl font-bold text-amber-800 mb-3">
                  Forgot Password
                </h1>
                <p className="text-stone-600 text-lg">
                  We will send reset instructions to your email. Fill out the
                  form correctly.
                </p>
              </header>

              {/* Form */}
              <div className="space-y-6">
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
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-stone-200 bg-white rounded-xl focus:border-amber-600 focus:outline-none  text-stone-800"
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

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="cursor-pointer w-full bg-amber-700 text-white py-4 rounded-xl font-semibold"
                >
                  Send Reset Link
                </button>
              </div>

              {/* Back to Login */}
              <div className="mt-8 text-center">
                <Link to="../login">
                  <button className="cursor-pointer inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold ">
                    <ArrowLeft size={20} />
                    <span>Back to Login</span>
                  </button>
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
                <p className="text-sm text-amber-900">
                  <span className="font-semibold">Note:</span> Please check your
                  email inbox. The reset link will expire in 15 minutes.
                </p>
              </div>

              {/* Help Section */}
              <div className="mt-8 text-center">
                <p className="text-stone-600">
                  Need help?{" "}
                  <a
                    href="#"
                    className="text-amber-700 hover:text-amber-800 font-semibold "
                  >
                    Contact Support
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default Forgot;
