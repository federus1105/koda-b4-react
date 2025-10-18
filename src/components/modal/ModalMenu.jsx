import { Search } from "lucide-react"; // atau icon yang kamu pakai
import React from "react";

function ModalMenu({ isopen, onclose }) {
  if (!isopen) return null;

  return (
    <div className="fixed inset-0 z-12">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-opacity-40"
        onClick={onclose}
      />

      {/* Side Modal */}
      <section
        className={`
          fixed top-0 left-0 h-full w-2/3 bg-white shadow-lg
          flex flex-col justify-between p-5
          transform transition-transform duration-500
        `}
      >
        {/* Top section */}
        <div className="flex flex-col gap-7">
          {/* Icon and Logo */}
          <header className="flex justify-between items-center">
            <div className="flex gap-3">
              <img src="/icon.svg" alt="icon" />
              <img src="/Logo.svg" alt="logo" />
            </div>
            <button onClick={onclose}>
              <img src="/XCircle.svg" alt="close" className="cursor-pointer" />
            </button>
          </header>

          {/* Search */}
          <div className="flex flex-col gap-3">
            <h1 className="font-medium">Search Product</h1>
            <div className="relative">
              <Search className="absolute top-3 left-2 text-gray-500" />
              <input
                type="text"
                placeholder="Find Product"
                className="border border-gray-400 bg-gray-100 rounded-lg py-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col gap-3 font-medium">
            <button
              onClick={onclose}
              className="text-left text-black hover:text-orange-500"
            >
              Home
            </button>
            <hr className="border-orange-400" />
            <button
              onClick={onclose}
              className="text-left text-black hover:text-orange-500"
            >
              Product
            </button>
            <hr className="border-gray-300" />
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onclose}
            className="w-full border py-3 rounded-lg hover:bg-gray-100"
          >
            Signin
          </button>
          <button
            onClick={onclose}
            className="w-full bg-orange-400 py-3 rounded-lg text-white hover:bg-orange-500"
          >
            SignUp
          </button>
        </div>
      </section>
    </div>
  );
}

export default ModalMenu;
