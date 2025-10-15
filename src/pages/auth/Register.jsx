import React, { useState } from "react";
import { Link } from "react-router";

function Register() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmIsPasswordVisible] =
    useState(false);

  // toogle password visibiliy
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  // toogle confirm password visibiliy
  const toggleConfirmPasswordVisibility = () => {
    setConfirmIsPasswordVisible(!isConfirmPasswordVisible);
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
              <section className="px-5 flex justify-center flex-col w-full lg:px-20">
                <div className="flex items-center gap-2 md:mb-10">
                  <img src="/icon.svg" alt="icon" />
                  <img src="/Logo.svg" alt="" />
                </div>
                {/* header */}
                <header className="flex flex-col gap-2 my-3">
                  <h1 className="text-[#8E6447] text-xl font-medium">
                    Register
                  </h1>
                  <p className="text-gray-500 mt-2">
                    Fill out the form correctly
                  </p>
                </header>

                {/* input user email and pass */}
                <form>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="Fullname" className="font-medium">
                      Fullname
                    </label>
                    <div className="input-Fulname flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                      <img src="/Profile.svg" alt="" className="w-4 h-3.5" />
                      <input
                        type="text"
                        id="fulname"
                        placeholder="Enter Your Fullname"
                        className="w-full outline-none"
                      />
                    </div>
                    <span className="text-red-500 min-h-[1.5rem] text-sm">
                      {/* {errorem} */}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-medium">
                      Email
                    </label>
                    <div className="input-email flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                      <img src="/Logo-Email.svg" alt="" className="w-4 h-3.5" />
                      <input
                        type="text"
                        id="email"
                        placeholder="Enter Your Email"
                        className="w-full outline-none"
                      />
                    </div>
                    <span className="text-red-500 min-h-[1.5rem] text-sm">
                      {/* {errorem} */}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-medium">
                      Password
                    </label>
                    <div className="flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-1.5 w-full gap-3 h-11">
                      <img
                        src="/Logo-Password.svg"
                        alt="password"
                        className="w-4 h-3.5"
                      />
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        placeholder="Enter Your Password"
                        className="w-full outline-none"
                      />
                      <img
                        src={
                          isPasswordVisible
                            ? "/Logo-Eye.svg"
                            : "/Logo-Eye-Close.svg"
                        }
                        alt=""
                        className="w-20 h-3.5 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    </div>
                    <span className="text-red-500 min-h-[1.5rem] text-sm">
                      {/* {errorpass} */}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="confirmpassword" className="font-medium">
                      Confirm Password
                    </label>
                    <div className="flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                      <img
                        src="/Logo-Password.svg"
                        alt="confirmpassword"
                        className="w-4 h-3.5"
                      />
                      <input
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        id="confirmpassword"
                        placeholder="Enter Your Password Again"
                        className="w-full outline-none"
                        // value={confirmPassword}
                        // onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <img
                        src={
                          isConfirmPasswordVisible
                            ? "/Logo-Eye.svg"
                            : "/Logo-Eye-Close.svg"
                        }
                        alt=""
                        className="w-20 h-3.5 cursor-pointer"
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    </div>
                    <span className="text-red-500 min-h-[1.5rem] text-sm">
                      {/* {errorConfirmpass} */}
                    </span>
                  </div>
                  <Link to={"../login"}>
                    <button
                      type="submit"
                      className="w-full bg-orange-400 text-white h-10 rounded-md cursor-pointer mt-2"
                    >
                      Register
                    </button>
                  </Link>
                  <p className="text-center mt-8 text-gray-500">
                    Have An Account ?{" "}
                    <Link to="../login">
                      <span className="text-orange-400">Login</span>
                    </Link>
                  </p>
                </form>
                <div className="relative text-center my-5">
                  <hr className="border-t border-gray-300" />
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-7 text-gray-400">
                    Or
                  </span>
                </div>
                {/* Sign In other */}
                <section className="flex gap-5 mt-5">
                  <button className="shadow-lg rounded-xl w-full h-13 border-gray-300 cursor-pointer flex items-center justify-center gap-5">
                    <img src="/Google.svg" alt="" />
                    <p className="hidden lg:block">Sign In With Google</p>
                  </button>
                  <button className="shadow-lg rounded-xl w-full h-13 border-gray-300 cursor-pointer flex items-center justify-center gap-5">
                    <img src="/Facebook.svg" alt="" />
                    <p className="hidden lg:block">Sign In With Facebook</p>
                  </button>
                </section>
              </section>
            </section>
          </section>
        </div>
      </section>
    </>
  );
}

export default Register;
