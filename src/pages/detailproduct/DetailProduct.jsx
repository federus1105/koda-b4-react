import React, { useState } from "react";
import {
  ThumbsUp,
  Minus,
  Plus,
  ShoppingCart,
  MoveRight,
  Import,
} from "lucide-react";
import Card from "../../components/cardproduct/Card";
import { Link } from "react-router";

function DetailProduct({ min = 1, max = 10, onChange }) {
  const [quantity, setQuantity] = useState(min);

  const handleDecrease = () => {
    if (quantity > min) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onChange?.(newQty);
    }
  };
  const handleIncrease = () => {
    if (quantity < max) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      onChange?.(newQty);
    }
  };

  return (
    <>
      <header className="my-20 mx-5 lg:flex lg:mx-30 lg:mt-40">
        {/* Images */}
        <div className="lg:w-1/2 flex flex-col items-center">
          {/* Gambar utama */}
          <div className="w-full max-w-md">
            <img
              src="/coffe1.svg"
              alt="Main Coffee"
              className="mx-auto w-full object-cover"
            />
          </div>

          {/* Gambar thumbnail / list */}
          <div className="flex justify-center my-4 w-full">
            <div className="flex gap-3 w-full max-w-md">
              <img
                src="/coffe2.svg"
                alt="Coffee 2"
                className="w-1/3 object-cover"
              />
              <img
                src="/coffe3.svg"
                alt="Coffee 3"
                className="w-1/3 object-cover"
              />
              <img
                src="/coffe4.svg"
                alt="Coffee 4"
                className="w-1/3 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="lg:w-1/2 md:mt-5 md:mx-15">
          <button className="bg-red-700 text-white rounded-4xl py-2 px-5">
            FlASH SALE
          </button>
          <div className="flex flex-col gap-5 mt-5">
            <h1 className="text-xl font-medium lg:text-3xl">Hazelnut Latte</h1>
            <div className="flex gap-2">
              <span className="line-through text-red-700">IDR10.000</span>
              <h1 className="text-orange-500 text-xl">IDR 20.000</h1>
            </div>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <img key={index} src="/star.svg" alt="Star" />
              ))}
              <p>5.0</p>
            </div>
            <div className="flex gap-5 text-gray-500 text-xl">
              <p>200+ Review</p>
              <p>|</p>
              <p>Recomendation</p>
              <ThumbsUp />
            </div>
            <div>
              <p className="text-gray-500 text-xl">
                Cold brewing is a method of brewing that combines ground coffee
                and cool water and uses time instead of heat to extract the
                flavor. It is brewed in small batches and steeped for as long as
                48 hours
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 border"
                disabled={quantity === min}
              >
                <Minus size={15} />
              </button>

              <span className="px-4 py-2 font-medium">{quantity}</span>

              <button
                onClick={handleIncrease}
                className="p-2 rounded bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
                disabled={quantity === max}
              >
                <Plus size={15} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="font-medium">Choose Size</h1>
              <div className="flex justify-between gap-10">
                <button className="border border-gray-300 w-full py-2 px-4 cursor-pointer">
                  Regular
                </button>
                <button className="border border-gray-300 w-full py-2 px-4 cursor-pointer">
                  Medium
                </button>
                <button className="border border-gray-300 w-full py-2 px-4 cursor-pointer">
                  Large
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="font-medium">Hot/Ice?</h1>
              <div className="flex justify-between lg:gap-10">
                <button className="border border-gray-300 py-2 px-20 lg:w-full cursor-pointer">
                  Ice
                </button>
                <button className="border border-gray-300 py-2 px-20 lg:w-full cursor-pointer">
                  Hot
                </button>
              </div>
            </div>
            <div className="flex gap-4 flex-col md:flex-row lg:mt-10">
                <Link to={"/checkout"} className="bg-orange-400 w-full py-4 rounded-md cursor-pointer text-center">
                  Buy
                </Link>
              <button className="flex border border-orange-400 text-orange-500 w-full justify-center py-4 gap-2 rounded-md cursor-pointer">
                <ShoppingCart />
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="mx-5 flex flex-col gap-5">
        <h1 className="text-center text-2xl font-medium">
          Recommendation <span className="text-[#8E6447]">For You</span>
        </h1>
        <Card />
        <div className="mb-10">
          <div className="flex items-center justify-center gap-2 mt-10">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className="w-10 h-10 rounded-full bg-gray-200 text-gray-400 active:bg-orange-400"
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

export default DetailProduct;
