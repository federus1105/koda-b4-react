import React from "react";
import { Search } from "lucide-react";

function ModalMenu() {
  return (
    <>
      <section className="min-h-screen py-10 px-5 mr-10 flex flex-col justify-between">
        <div className="flex  flex-col gap-7">
          {/* Icon And logo */}
          <header className="flex justify-between">
            <div className="flex gap-3">
              <img src="/icon.svg" alt="" />
              <img src="/Logo.svg" alt="" />
            </div>
            <img src="/XCircle.svg" alt="" className="cursor-pointer"/>
          </header>
          {/* Search */}
          <div className="flex flex-col gap-3">
            <h1 className="font-medium">Search Product</h1>
            <div className="relative">
              <Search className="absolute top-3 left-2" />
              <input
                type="text"
                placeholder="Find Product"
                className="border border-gray-400 bg-gray-200 rounded-lg py-3 w-full pl-10"
              />
            </div>
          </div>
          {/* Button Menu */}
          <div className="flex flex-col gap-3 font-medium">
            <p>Home</p>
            <hr className="border-orange-400"/>
            <p >Product</p>
            <hr className="border-gray-400"/>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button className="w-full border py-3 rounded-lg">
            Signin
          </button>
          <button className="w-full bg-orange-400 py-3 rounded-lg">
            SignUp
          </button>
        </div>
      </section>
    </>
  );
}

export default ModalMenu;
