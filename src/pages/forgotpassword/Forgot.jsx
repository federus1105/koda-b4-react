import React from "react";

function Forgot() {
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
                <form>
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

export default Forgot;
