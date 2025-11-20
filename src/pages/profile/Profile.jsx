import { KeyRound, LucideClosedCaption, Mail, MapPin, Phone, User } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
const defaultProfilePhoto = "/default-profile.webp";

function Profile() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const profile = useSelector((state) => state.auth.currentUser);

  // toogle password visibiliy
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <>
      <div className="mx-5 my-25 flex flex-col gap-10 lg:flex-row lg:justify-center md:mx-20 lg:my-30">
        <header className="flex flex-col gap-4 lg:w-1/4">
          <h1 className="font-medium text-xl lg:text-3xl">Profile</h1>
          <div className="border border-gray-300 rounded-lg flex flex-col px-10 py-3 lg:py-10 items-center gap-3">
            <h1 className="font-medium text-xl">{profile.fullname}</h1>
            <p className="text-gray-500"></p>
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img
                src={profile.photos || defaultProfilePhoto}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <button className="bg-orange-400 py-3 rounded-lg px-4 w-full">
              Upload New Photo
            </button>
            <p>
              Since <span className="font-medium">20 January 2024</span>
            </p>
          </div>
        </header>
        <div className="border border-gray-300 px-3 lg:px-20 lg:py-15 py-5 lg:my-13 rounded-lg lg:w-1/2">
          <form onSubmit="" className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="Phone" className="font-medium">
                Fullname
              </label>
              <div className="flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                <User className="text-gray-400" />
                <input
                  type="text"
                  value={profile.fullname}
                  id="fulname"
                  placeholder="Enter Your Fullname"
                  className="w-full outline-none"
                />
              </div>
            </div>
            {/* email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <div className="flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                <Mail className="text-gray-400" />
                <input
                  type="text"
                  id="email"
                  value={profile.email}
                  placeholder="Enter Your Email"
                  className="w-full outline-none"
                />
              </div>
            </div>
            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-medium">
                Phone
              </label>
              <div className="flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                <Phone className="text-gray-400"/>
                <input
                  type="text"
                  id="fulname"
                  value={profile.phone || ""}
                  placeholder="Enter Your Phone"
                  className="w-full outline-none"
                />
              </div>
            </div>
            {/* password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <div className="flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-1.5 w-full gap-3 h-11">
                <KeyRound className="text-gray-400" />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter Your Password"
                  className="w-full outline-none"
                />
                <img
                  src={
                    isPasswordVisible ? "/Logo-Eye.svg" : "/Logo-Eye-Close.svg"
                  }
                  alt=""
                  className="w-20 h-3.5 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
            {/* Address */}
            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="font-medium">
                Address
              </label>
              <div className="flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                <MapPin className="text-gray-400"/>
                <input
                  type="text"
                  id="address"
                  value={profile.addres || ""}
                  placeholder="Enter Your Address"
                  className="w-full outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="cursor-pointer bg-orange-400 w-full py-3 rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
