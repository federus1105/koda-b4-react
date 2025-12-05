import { History, Loader2, PlusCircle, ShoppingCart } from "lucide-react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfile } from "../../services/profileService";
import { updateUser } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";
const defaultProfilePhoto = "/default-profile.webp";
import { useForm } from "react-hook-form";
import { delay, formatDate } from "../../utils/common";
import UpdatePassword from "../../components/updatePassword/UpdatePassword";
import { Link, useOutletContext } from "react-router-dom";
import { ProfileValidation } from "../../hooks/UseValidation";

function Profile() {
  const profile = useSelector((state) => state.auth.currentUser);
  const token = useSelector((state) => state.auth.token);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { setLoading } = useOutletContext();

  // --- USE FORM ---
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: profile.fullname,
      email: profile.email,
      phone: profile.phone || "",
      address: profile.address || "",
      photos: null,
    },
  });

  // --- UPDATE PROFILE ----
  const onSubmitProfile = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (data.fullname !== profile.fullname)
        formData.append("fullname", data.fullname);
      if (data.email !== profile.email) formData.append("email", data.email);
      if (data.phone !== profile.phone && data.phone !== "") {
        formData.append("phone", data.phone);
      }
      if (data.address !== profile.address)
        formData.append("address", data.address);
      if (file) {
        formData.append("photos", file);
      }

      const res = await UpdateProfile(formData, token);
      dispatch(updateUser(res.result));
      toast.success("Update profile berhasil");
      await delay(1000);
    } catch (err) {
      console.log(err);
      await delay(1000);
      toast.error("Terjadi kesalahan! silahkan coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-5 my-25 flex flex-col gap-10 lg:flex-row lg:justify-center md:mx-20 lg:my-40">
      {/* Left - Profile Card */}
      <header className="flex flex-col gap-4 lg:w-1/4">
        <div className="border border-gray-300 rounded-lg flex flex-col px-10 py-3 lg:py-10 items-center gap-3">
          <h1 className="font-medium text-xl">{profile.fullname}</h1>
          <div
            className="w-20 h-20 relative cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={profile.photos || defaultProfilePhoto}
              alt={profile.fullname}
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
              <span className="text-white text-lg font-bold">
                <PlusCircle />
              </span>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p>
            Since{" "}
            <span className="font-medium">
              {formatDate(profile.created_at)}
            </span>
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 flex flex-col divide-y divide-gray-100">
          {/* History */}
          <Link
            to={"/history"}
            className="flex items-center justify-between py-4 hover:bg-gray-50 rounded-lg px-2 transition"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <History size={20} />
              </div>
              <div className="flex flex-col">
                <p className="text-gray-800 font-semibold">
                  History Transaction
                </p>
                <span className="text-sm text-gray-500">
                  Lihat riwayat pembelian Anda
                </span>
              </div>
            </div>
            <span className="text-gray-400 text-xl">›</span>
          </Link>

          {/* Cart */}
          <Link
            to={"/checkout"}
            className="flex items-center justify-between py-4 hover:bg-gray-50 rounded-lg px-2 transition"
          >
            <div className="flex items-center gap-4">
              <div className="bg-pink-100 text-pink-600 p-3 rounded-full">
                <ShoppingCart size={20} />
              </div>
              <div className="flex flex-col">
                <p className="text-gray-800 font-semibold">Cart</p>
                <span className="text-sm text-gray-500">
                  Lihat barang yang ingin dibeli
                </span>
              </div>
            </div>
            <span className="text-gray-400 text-xl">›</span>
          </Link>
        </div>
      </header>

      {/* Right - Forms */}
      <div className="flex flex-col gap-6 lg:w-1/2">
        {/* --- FORM PROFILE --- */}
        <form
          onSubmit={handleSubmit(onSubmitProfile)}
          className="border border-gray-300 rounded-2xl px-6 py-6 flex flex-col gap-4"
        >
          <h2 className="text-lg font-medium mb-6">Details Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullname" className="text-sm text-gray-600">
                Fullname
              </label>
              <div className="flex items-center border border-gray-300 bg-gray-50 rounded-lg py-2.5 px-3 w-full gap-3">
                <input
                  type="text"
                  {...register("fullname", {
                    validate: (value) =>
                      ProfileValidation(value, profile.fullname, "fullname"),
                  })}
                  placeholder="Enter Your Fullname"
                  className="w-full outline-none text-sm"
                />
              </div>
              {errors.fullname && (
                <p className="text-red-500 text-sm">
                  {errors.fullname.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="fullname" className="text-sm text-gray-600">
                Address
              </label>
              <div className="flex items-center border border-gray-300 bg-gray-50 rounded-lg py-2.5 px-3 w-full gap-3">
                <input
                  type="text"
                  {...register("address", {
                    validate: (value) =>
                      ProfileValidation(value, profile.address, "address"),
                  })}
                  placeholder="Enter Your Address"
                  className="w-full outline-none text-sm"
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-gray-600">
                E-mail
              </label>
              <div className="flex items-center border border-gray-300 bg-gray-50 rounded-lg py-2.5 px-3 w-full gap-3">
                <input
                  type="email"
                  {...register("email", {
                    validate: (value) =>
                      ProfileValidation(value, profile.email, "email"),
                  })}
                  placeholder="Enter Your Email"
                  className="w-full outline-none text-sm"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm text-gray-600">
                Phone Number
              </label>
              <div className="flex items-center border border-gray-300 bg-gray-50 rounded-lg py-2.5 px-3 w-full gap-3">
                <input
                  type="text"
                  {...register("phone", {
                    validate: (value) =>
                      ProfileValidation(value, profile.phone, "phone"),
                  })}
                  placeholder="Enter Your Phone"
                  className="w-full outline-none text-sm"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer bg-brand text-white w-full md:w-auto px-8 py-3 rounded-lg font-medium mt-2"
          >
            Update Changes
          </button>
        </form>

        {/* --- FORM UPDATE PASSWORD --- */}
        <UpdatePassword token={token} />
      </div>
    </section>
  );
}

export default Profile;
