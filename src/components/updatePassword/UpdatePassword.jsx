import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UpdatePasswordUser } from "../../services/profileService";
import { Loader2 } from "lucide-react";
import { delay } from "../../utils/common";

function UpdatePassword({ token }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

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
      toast.error(err.data?.message || "Terjadi kesalahan! silahkan coba lagi");
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
          <div className="flex flex-col gap-2">
            <label htmlFor="old_password" className="text-sm text-gray-600">
              Old Password
            </label>
            <input
              type="password"
              {...register("old_password")}
              placeholder="Write your old password"
              className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="new_password" className="text-sm text-gray-600">
              New Password
            </label>
            <input
              type="password"
              {...register("new_password")}
              placeholder="Write your new password"
              className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirm_password" className="text-sm text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirm_password")}
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm outline-none"
            />
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
