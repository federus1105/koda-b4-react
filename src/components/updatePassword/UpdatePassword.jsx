import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UpdatePasswordUser } from "../../services/profileService";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { delay } from "../../utils/common";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../hooks/UseValidation";

function UpdatePassword({ token }) {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  // ---- TOGGLE FUNCTION ---
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const newPassword = watch("new_password");
  const oldPassword = watch("old_password");

  // --- HANDLE SUBMIT ---
  const onSubmit = async (data) => {
    if (!data.old_password && !data.new_password && !data.confirm_password) {
      toast.error("Field harus di isi");
      return;
    }
    setIsLoading(true);
    try {
      const payload = {
        old_password: data.old_password,
        new_password: data.new_password,
        confirm_password: data.confirm_password,
      };
      const res = await UpdatePasswordUser(payload, token);
      toast.success("Password berhasil diupdate");
      await delay(1000);
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan! silahkan coba lagi");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-6">
        <Loader2 className="w-12 h-12 animate-spin text-[#997950]" />
      </div>
    );
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-300 rounded-2xl px-6 py-6 flex flex-col gap-4"
      >
        <h2 className="text-lg font-medium mb-6">Update Password</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Old Password */}
          <div className="space-y-2">
            <label htmlFor="old_password" className="text-sm text-gray-600">
              Old Password
            </label>
            <div className="relative">
              <input
                type={passwordVisibility.oldPassword ? "text" : "password"}
                {...register("old_password", {
                  validate: (value) => {
                    if (newPassword && !value)
                      return "Old password harus diisi";
                    return true;
                  },
                })}
                placeholder="Write your old password"
                className="w-full pl-5 pr-12 py-2.5 border border-gray-300 bg-white rounded-xl focus:border-[#997950] focus:outline-none text-stone-800"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("oldPassword")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {passwordVisibility.oldPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {errors.old_password && (
              <p className="text-red-500 text-sm">
                {errors.old_password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="new_password" className="text-sm text-gray-600">
              New Password
            </label>
            <div className="relative">
              <input
               type={passwordVisibility.newPassword ? "text" : "password"}
                {...register("new_password", {
                  validate: (value) => {
                    if (oldPassword && !value)
                      return "New password harus diisi";
                    if (!value) return true;
                    return validatePassword(value) || true;
                  },
                })}
                placeholder="Write your new password"
                className="w-full pl-5 pr-12 py-2.5 border border-gray-300 bg-white rounded-xl focus:border-[#997950] focus:outline-none text-stone-800"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("newPassword")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {passwordVisibility.newPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {errors.new_password && (
              <span className="text-red-500 text-sm">
                {errors.new_password.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm_password" className="text-sm text-gray-600">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={passwordVisibility.confirmPassword ? "text" : "password"}
                {...register("confirm_password", {
                  validate: (value) => {
                    if (newPassword && !value)
                      return "Konfirmasi password harus diisi";
                    if (!value) return true;
                    return validateConfirmPassword(newPassword, value) || true;
                  },
                })}
                placeholder="Confirm your password"
                className="w-full pl-5 pr-12 py-2.5 border border-gray-300 bg-white rounded-xl focus:border-[#997950] focus:outline-none text-stone-800"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {passwordVisibility.confirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {errors.confirm_password && (
              <p className="text-red-500 text-sm">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="cursor-pointer bg-[#997950] hover:bg-[#886540] text-white w-full md:w-auto px-8 py-3 rounded-lg font-medium mt-4"
        >
          Update Password
        </button>
      </form>
    </>
  );
}

export default UpdatePassword;
