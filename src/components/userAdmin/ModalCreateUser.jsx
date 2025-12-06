import React, { useState } from "react";
import { applyValidator, delay } from "../../utils/common";
import { toast } from "react-toastify";
import { useForm, FormProvider } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminCreateUser } from "../../services/userService";
import { Images, X } from "lucide-react";
import {
  validateAddress,
  validateEmail,
  validateFullname,
  validateImage,
  validatePassword,
  validatePhone,
} from "../../hooks/UseValidation";
import InputField from "../Form/InputField";
import SelectBoxOption from "../Form/SelectBoxOption";

function ModalCreateUser({ onClose }) {
  const token = useSelector((state) => state.auth.token);
  const { setLoading } = useOutletContext();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  // --- USER FORM ---
  const methods = useForm();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = methods;

  const selectedRole = watch("role");

  // --- Handle Upload Image ---
  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const result = validateImage(file);
      if (result !== true) {
        setError("photos", { message: result });
        setValue("photos", null);
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotoPreview(ev.target.result);
        setPhotoFile(file);

        setValue("photos", file, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    };

    input.click();
  };

  // --- HANDLER REMOVE IMAGE ---
  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setPhotoPreview(null);
    setPhotoFile(null);
    setValue("photos", null);
  };

  // --- FormData ---
  const buildFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    if (photoFile instanceof File) {
      formData.append("photos", photoFile);
    }

    return formData;
  };

  // ---- Submit Handler ---
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await delay(800);
      const formData = buildFormData(data);
      await AdminCreateUser(formData, token);
      toast.success("User berhasil dibuat!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Gagal membuat user, silahkan coba lagi.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl z-50 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-medium text-lg">Insert User</h1>
          <button type="button" onClick={onClose}>
            <X className="text-red-500 w-6 h-6 cursor-pointer" />
          </button>
        </div>

        {/* FORM */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Image User
              </label>

              <input
                type="hidden"
                {...register("photos", { validate: validateImage })}
              />

              <div
                className="relative w-24 h-24 rounded-md bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 overflow-hidden"
                onClick={handleImageClick}
              >
                {photoPreview ? (
                  <>
                    <img
                      src={photoPreview}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-500"
                    >
                      <X className="cursor-pointer w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <Images className="w-8 h-8 text-gray-400" />
                )}
              </div>

              {errors.photos && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photos.message}
                </p>
              )}
            </div>

            {/* Inputs */}
            <InputField
              label="Full Name"
              name="fullname"
              rules={{
                validate: applyValidator(validateFullname),
              }}
              placeholder="Enter Full Name"
            />

            <InputField
              label="Email"
              name="email"
              type="text"
              placeholder="Enter Email"
              rules={{
                validate: applyValidator(validateEmail),
              }}
            />

            <InputField
              label="Phone"
              name="phone"
              rules={{
                validate: validatePhone,
              }}
              placeholder="Enter Phone Number"
            />

            <InputField
              label="Password"
              name="password"
              rules={{ validate: applyValidator(validatePassword) }}
              placeholder="Enter Password"
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
                {...register("address", {
                  validate: validateAddress,
                })}
                placeholder="Enter Address"
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

            {/* ROLE */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Type of User
              </label>
              <input type="hidden" {...register("role", { required: true })} />
              <div className="flex gap-3">
                <SelectBoxOption
                  name="role"
                  value="user"
                  label="Normal User"
                  selected={selectedRole}
                  onChange={() =>
                    setValue("role", "user", { shouldValidate: true })
                  }
                />
                <SelectBoxOption
                  name="role"
                  value="admin"
                  label="Admin"
                  selected={selectedRole}
                  onChange={() =>
                    setValue("role", "admin", { shouldValidate: true })
                  }
                />
              </div>

              {errors.role && (
                <p className="text-red-500 text-sm mt-1">Select user type</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="cursor-pointer w-full bg-brand text-white rounded-md py-2 font-semibold hover:bg-[#997950]"
            >
              Add User
            </button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}

export default ModalCreateUser;
