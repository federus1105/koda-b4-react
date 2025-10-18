import { MoveLeft, Search, SlidersHorizontal, MoveRight } from "lucide-react";
import React from "react";
import Card from "../../components/cardproduct/Card";

function Product() {
  return (
    <>
      <header className="my-20 mx-5 md:my-18 md:mx-0 flex flex-col gap-5">
        <div className="hidden md:block relative w-full">
          <img
            src="/bg-product.svg"
            alt="background"
            className="brightness-70 w-full"
          />
          <h1 className="absolute top-1/2 left-10 lg:left-30 -translate-y-1/2 text-white z-2 text-2xl lg:text-4xl max-w-xl">
            We Provide Good Coffee and Healthy Meals
          </h1>
        </div>
        {/* Search */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="relative w-full">
            <Search className="absolute top-3 left-2" />
            <input
              type="text"
              placeholder="Find Product"
              className="border border-gray-400 bg-gray-200 rounded-lg py-3 w-full pl-10"
            />
          </div>
          <div>
            <SlidersHorizontal className="cursor-pointer" />
          </div>
        </div>
        <div>
          <div className="flex md:justify-between md:mx-20 lg:mx-30">
            <h1 className="font-semibold text-xl lg:text-3xl">
              Today <span className="text-[#8E6447]">Promo</span>
            </h1>
            <div className="md:flex gap-3 hidden md:block">
              <button className="bg-gray-300 rounded-full p-3">
                {" "}
                <MoveLeft />
              </button>
              <button className="bg-orange-500 rounded-full p-3">
                {" "}
                <MoveRight />
              </button>
            </div>
          </div>
        </div>
        {/* Card */}
        <div className="flex gap-2">
          <div className="bg-[#88B788] rounded-xl w-full md:w-[350px] flex items-end gap-4 px-3 py-2">
            <img src="/karakter.svg" alt="Karakter" className="w-18" />
            <div>
              <h1 className="font-semibold">
                HAPPY MOTHER’S DAY! <br />
                <span className="font-normal text-base">
                  Get one of our favorite menu for free!
                </span>
              </h1>
              <p className="cursor-pointer text-white">Klaim Kupon</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 justify-start md:mx-20 lg:30">
          <button className="w-6 h-2 rounded-full duration-300 bg-orange-500" />
          <button className="w-2 h-2 rounded-full duration-300 bg-gray-300" />
          <button className="w-2 h-2 rounded-full duration-300 bg-gray-300" />
          <button className="w-2 h-2 rounded-full duration-300 bg-gray-300" />
        </div>
      </header>
      <div className="mx-5 lg:mx-30 lg:flex justify-between">
        <div>
          <h1 className="text-xl mb-2">
            Our <span className="text-[#8E6447]">Product</span>
          </h1>
          <div className="bg-black w-100 hidden lg:block text-white px-5 rounded-md py-7">
            <div className="flex flex-col gap-5">
              <div className="flex justify-between">
                <p>Filter</p>
                <p>Reset Filter</p>
              </div>
              {/* search */}
              <div className="w-full">
                <p>Search</p>
                <input
                  type="text"
                  placeholder="Search Your Product"
                  className="bg-white py-3 w-full pl-10 text-black"
                />
              </div>
              {/* Category */}
              <div className="flex flex-col gap-5">
                <h1 className="font-semibold">Category</h1>
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    id="favorite"
                    className="accent-orange-500 w-4 rounded-md"
                  />
                  <label htmlFor="favorite">Favorite Product</label>
                </div>
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    id="coffe"
                    className="accent-orange-500 w-4 rounded-md"
                  />
                  <label htmlFor="coffe">Coffe</label>
                </div>
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    id="noncoffe"
                    className="accent-orange-500 w-4 rounded-md"
                  />
                  <label htmlFor="noncoffe">Non Coffe</label>
                </div>
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    id="foods"
                    className="accent-orange-500 w-4 rounded-md"
                  />
                  <label htmlFor="foods">Foods</label>
                </div>
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    id="addon"
                    className="accent-orange-500 w-4 rounded-md"
                  />
                  <label htmlFor="addon">Add-On</label>
                </div>
              </div>
              {/* Sort By */}
              <div className="flex flex-col gap-5">
                <h1 className="font-semibold">Sort By</h1>
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    id="buy1"
                    className="accent-orange-500 w-4 rounded-md"
                  />
                  <label htmlFor="buy1">Buy 1 Get 1</label>
                </div>
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    id="flahssale"
                    className="accent-orange-500 w-4 rounded-md"
                  />
                  <label htmlFor="flahssale">Flash Sale</label>
                </div>
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    id="birthday"
                    className="accent-orange-500 w-4 rounded-md"
                  />
                  <label htmlFor="birthday">Birthday Package</label>
                </div>
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    id="Cheap"
                    className="accent-orange-500 w-4 rounded-md"
                  />
                  <label htmlFor="Cheap">Cheap</label>
                </div>
              </div>
              {/* Range Price */}
              <div>
                <h1>Range Price</h1>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  className="w-full accent-orange-500   "
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>idr0</span>
                  <span>idr1000</span>
                </div>
              </div>
              <button className="w-full bg-orange-500 h-12 rounded-lg">
                Apply Filter
              </button>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <Card />
          <div className="flex items-center justify-center gap-2 mt-10">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className="w-8 h-8 rounded-full border border-gray-300 active:bg-orange-400"
              >
                {num}
              </button>
            ))}
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-orange-400">
              <MoveRight className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
