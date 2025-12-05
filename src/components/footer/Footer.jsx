import React from "react";

function Footer() {
  return (
    <>
      <footer className="px-8 py-10 bg-gray-200">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-evenly lg:items-start">
          {/* Logo & Description */}
          <div className="flex flex-col gap-4 lg:w-1/5">
            <div className="flex gap-3 items-center">
              <img src="/senja-kopi-kiri.png" alt="icon" className="w-14" />
              <p className="text-brand text-xl">𝔖𝔢𝔫𝔧𝔞 𝔎𝔬𝔭𝔦-𝔎𝔦𝔯𝔦</p>
            </div>
            <p className="text-gray-500">
              Coffee Shop is a store that sells some good meals, and especially
              coffee. We provide high quality beans.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-10 sm:flex-row lg:gap-30 justify-between">
            {/* Product */}
            <div className="flex flex-col gap-3">
              <h1 className="font-medium">Product</h1>
              <p className="text-gray-500">Our Product</p>
              <p className="text-gray-500">Pricing</p>
              <p className="text-gray-500">Locations</p>
              <p className="text-gray-500">Countries</p>
              <p className="text-gray-500">Blog</p>
            </div>

            {/* Engage */}
            <div className="flex flex-col gap-3">
              <h1 className="font-medium">Engage</h1>
              <p className="text-gray-500">Partner</p>
              <p className="text-gray-500">FAQ</p>
              <p className="text-gray-500">About Us</p>
              <p className="text-gray-500">Privacy Policy</p>
              <p className="text-gray-500">Terms of Service</p>
            </div>
          </div>

          {/* Social Media & Copyright */}
          <div className="flex flex-col gap-4 lg:items-end lg:text-right">
            <div className="flex flex-col gap-4">
              <h1 className="font-medium">Social Media</h1>
              <div className="flex gap-5">
                <img
                  src="/socmed/fb.svg"
                  alt="Facebook"
                  className="text-brand"
                />
                <img src="/socmed/twitter.svg" alt="Twitter" />
                <img src="/socmed/instagram.svg" alt="Instagram" />
              </div>
            </div>
            <p className="text-gray-400 font-medium mt-4 lg:mt-auto">
              ©2025 <span className="text-brand">Senja Kopi-kiri</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
