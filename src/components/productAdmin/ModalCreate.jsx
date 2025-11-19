import { ImagesIcon, X } from "lucide-react";
import React from "react";

function ModalCreate() {
  return (
    <>
      <section className="fixed right-0 top-20 min-h-screen w-full max-w-lg bg-white border p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-medium text-lg">Add Product</h1>
          <button aria-label="Close">
            <X className="text-red-500 w-6 h-6 cursor-pointer" />
          </button>
        </div>

        {/* Upload Images - 4 slots */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-full h-20 rounded-md bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200"
            >
              <ImagesIcon className="w-8 h-8 text-gray-400" />
            </div>
          ))}
        </div>

        {/* Form inputs */}
        <form className="space-y-7">
          <div>
            <label className="block text-sm font-medium mb-3">
              Product name
            </label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Price</label>
            <input
              type="text"
              placeholder="Enter Product Price"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Description
            </label>
            <textarea
              placeholder="Enter Product Description"
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Product Size
            </label>
            <div className="flex gap-2">
              {["R", "L", "XL"].map((size) => (
                <button
                  key={size}
                  type="button"
                  className="cursor-pointer border border-gray-300 rounded-md py-2 text-sm hover:border-orange-500 w-full"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Stock</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter Product Stock"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-orange-500 text-white resize-none rounded-md py-2 font-semibold hover:bg-orange-600 transition"
          >
            Save Product
          </button>
        </form>
      </section>
    </>
  );
}

export default ModalCreate;
