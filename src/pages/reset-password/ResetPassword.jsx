import { Eye, EyeOff, KeyRound, QrCode } from "lucide-react";
import React, { useState } from "react";
import useAuth from "../../hooks/UseAuth";
import { resetPassword } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const { formData, errors, handleChange, validate } = useAuth("reset");
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
              <section className="px-5 flex justify-center flex-col w-full lg:px-30">
                <div className="flex items-center gap-2 md:mb-10">
                  <img src="/icon.svg" alt="icon" />
                  <img src="/Logo.svg" alt="" />
                </div>
                {/* header */}
                <header className="flex flex-col gap-2 my-3">
                  <h1 className="text-[#8E6447] text-xl font-medium">
                    Fill out the form correctly
                  </h1>
                  <p className="text-gray-500 mt-2">
                    We will send new password to your email
                  </p>
                </header>

                {/* input user email and pass */}
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="token" className="font-medium">
                      OTP
                    </label>
                    <div className="flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                      <QrCode className="text-gray-400" />
                      <input
                        type="text"
                        id="token"
                        name="token"
                        value={formData.token}
                        onChange={handleChange}
                        placeholder="Enter Your Otp"
                        className="w-full outline-none"
                      />
                    </div>
                    <span className="text-red-500 min-h-[1.5rem] text-sm">
                      {errors.token}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-medium">
                      New Password
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
                      <button
                        type="button"
                        className="text-gray-400 cursor-pointer"
                        onClick={() => togglePasswordVisibility("password")}
                      >
                        {passwordVisibility.password ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>
                    </div>
                    <span className="text-red-500 min-h-[1.5rem] text-sm">
                      {errors.password}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="confirmpassword" className="font-medium">
                      New Confirm Password
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
                      <button
                        type="button"
                        className="text-gray-400 cursor-pointer"
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }
                      >
                        {passwordVisibility.confirmPassword ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>
                    </div>
                    <span className="text-red-500 min-h-[1.5rem] text-sm">
                      {errors.confirmPassword}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-400 text-white h-10 rounded-md cursor-pointer mt-2"
                  >
                    Submit
                  </button>
                </form>
              </section>
            </section>
          </section>
        </div>
      </section>
    </>
  );
}

export default ResetPassword;
