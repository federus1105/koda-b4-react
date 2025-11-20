import React from "react";
import { useForgot } from "../../hooks/UseValidation";
import { toast } from "react-toastify";
import { forgotPassword } from "../../services/authService";
import { Mail } from "lucide-react";

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
      console.log(resp)
      toast.success("Token Reset password telah dikirim!");
    } catch (error) {
      console.error("forgot error:", error);
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
                    <label htmlFor="email" className="font-medium">
                      Email
                    </label>
                    <div className="email flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                      <Mail className="text-gray-400" />
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Your Email"
                        className="w-full outline-none"
                      />
                    </div>
                    <span className="text-red-500 min-h-[1.5rem] text-sm">
                      {errors.email}
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
