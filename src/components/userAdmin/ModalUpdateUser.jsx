import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import {
  validateAddress,
  validateEmail,
  validateFullname,
  validateImage,
  validatePhone,
} from "../../hooks/UseValidation";
import { applyValidator, delay } from "../../utils/common";
import { toast } from "react-toastify";
import { AdminUpdateUser } from "../../services/userService";
import InputField from "../Form/InputField";
import SelectBoxOption from "../Form/SelectBoxOption";
import { ImagesIcon, X } from "lucide-react";

function ModalUpdateUser({ onClose, user }) {
  const token = useSelector((state) => state.auth.token);
  const { setLoading } = useOutletContext();

  const [photoPreview, setPhotoPreview] = useState(user?.photo || null);
  const [photoFile, setPhotoFile] = useState(null);

  const methods = useForm({
    defaultValues: {
      fullname: user.fullname || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      role: user.role || "",
      photos: null,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = methods;

  const selectedRole = watch("role");

  // === IMAGE UPLOAD ===
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = validateImage(file);
    if (result !== true) {
      setError("photos", { message: result });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoPreview(ev.target.result);
      setPhotoFile(file);
    };
    reader.readAsDataURL(file);

    setValue("photos", file, { shouldValidate: true });
  };

  // --- FORM UPDATE ---
  const FormUpdate = (formValues) => {
    const formData = new FormData();

    Object.entries(formValues).forEach(([key, value]) => {
      if (key === "photos") return;
      if (value !== user[key] && value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    if (photoFile) {
      formData.append("photos", photoFile);
    }

    return formData;
  };

  // --- HANDLE SUBMIT ---
  const onSubmit = async (formValues) => {
    try {
      setLoading(true);
      await delay(500);

      const formData = FormUpdate(formValues);

      await AdminUpdateUser({ id: user.id, formData, token });
      toast.success("User berhasil diupdate!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Gagal update user.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-medium text-lg">Update User</h1>
            <button type="button" onClick={onClose}>
              <X className="text-red-500 w-6 h-6 cursor-pointer" />
            </button>
          </div>

          {/* --- FORM --- */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* Image */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Image User
                </label>

                <div
                  className="w-24 h-24 rounded-md bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 overflow-hidden"
                  onClick={() => document.getElementById("photos").click()}
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImagesIcon className="w-8 h-8 text-gray-400" />
                  )}

                  <input
                    id="photos"
                    type="file"
                    accept="image/*"
                    {...register("photos", { validate: validateImage })}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                {errors.photos && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.photos.message}
                  </p>
                )}
              </div>

              {/* --- INPUT FORM --- */}
              <InputField
                label="Full Name"
                name="fullname"
                rules={{
                  validate: (value) => {
                    if (!value) return true;
                    return applyValidator(validateFullname)(value);
                  },
                }}
                placeholder="Enter Full Name"
              />

              <InputField
                label="Email"
                name="email"
                rules={{
                  validate: (value) => {
                    if (!value) return true;
                    return applyValidator(validateEmail)(value);
                  },
                }}
                placeholder="Enter Email"
              />

              <InputField
                label="Phone"
                name="phone"
                rules={{
                  validate: (value) => {
                    if (!value) return true;
                    return applyValidator(validatePhone)(value);
                  },
                }}
                placeholder="Enter Phone Number"
              />

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium mb-2"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  {...register("address", { validate: validateAddress })}
                  className={`w-full border rounded-md px-3 py-2 h-20 resize-none ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium mb-2"
                >
                  Type of User
                </label>

                <input id="role" type="hidden" {...register("role")} />

                <div className="flex gap-3">
                  <SelectBoxOption
                    name="role"
                    value="user"
                    label="Normal User"
                    selected={selectedRole}
                    onChange={() => setValue("role", "user")}
                  />
                  <SelectBoxOption
                    name="role"
                    value="admin"
                    label="Admin"
                    selected={selectedRole}
                    onChange={() => setValue("role", "admin")}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="cursor-pointer w-full bg-brand text-white rounded-md py-2 font-semibold hover:bg-[#997950]"
              >
                Update User
              </button>
            </form>
          </FormProvider>
        </div>
      </section>
    </>
  );
}

export default ModalUpdateUser;
