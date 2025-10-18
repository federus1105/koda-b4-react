import React from "react";
import { Plus, UserRoundPen, Mail, MapPinCheck } from "lucide-react";
import ItemOrder from "../../components/cardproduct/ItemOrder";
import { Link } from "react-router";

function Checkout() {
  return (
    <>
      <div className="mx-5 lg:flex gap-30 justify-center lg:mx-30">
        <div className="my-20 lg:w-1/3 lg:my-30">
          <h1 className="font-medium text-xl lg:text-3xl">Payment Details</h1>
          <div className="flex justify-between mt-8">
            <h1 className="font-medium text-xl">Your Order</h1>
            <button className="flex bg-orange-400 rounded-md py-2 px-4">
              <Plus /> Add Menu
            </button>
          </div>
          {/* Item Order */}
          <div className="my-5 flex flex-col gap-5">
            <ItemOrder />
            <ItemOrder />
          </div>
          {/* Form */}
          <div>
            <form className="flex flex-col gap-4">
              <h1 className="font-medium">Payment & Info Delivery</h1>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <div className="flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                  <Mail />
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter Your Email"
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="fullname" className="font-medium">
                  Fullname
                </label>
                <div className="flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                  <UserRoundPen />
                  <input
                    type="text"
                    id="fullname"
                    placeholder="Enter Your Full Name"
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="addres" className="font-medium">
                  Address
                </label>
                <div className=" flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                  <MapPinCheck />
                  <input
                    type="text"
                    id="adress"
                    placeholder="Enter Your Address"
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="font-medium">Delivery</h1>
                <div className="flex justify-between">
                  <button className="border border-gray-300 rounded-md py-2 px-6">
                    Dine In
                  </button>
                  <button className="border border-gray-300 rounded-md py-2 px-6">
                    Door Delivery
                  </button>
                  <button className="border border-gray-300 rounded-md py-2 px-6">
                    Pick Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="my-20 lg:w-1/3 lg:my-40">
          {/* Card Payment*/}
          <div className="mt-10">
            <h1 className="my-5 font-medium text-xl lg:text-2xl">Total</h1>
            <div className="bg-gray-100 px-5 py-10 flex flex-col gap-6">
              <div className="flex justify-between">
                <p className="font-medium text-gray-500">Order</p>
                <p className="font-medium">Idr.40.000</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-gray-500">Delivery</p>
                <p className="font-medium">Idr.40.000</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-gray-500">Tax</p>
                <p className="font-medium"> Idr.40.000</p>
              </div>
              <hr className="border border-gray-300" />
              <div className="flex justify-between">
                <p className="font-medium text-gray-500">Sub Total</p>
                <p className="font-medium">Idr.44.0000</p>
              </div>
              <Link to={"/history"}>
                <button className="bg-orange-400 w-full py-3 rounded-lg cursor-pointer">
                  Checkout
                </button>
              </Link>
              <div className="flex flex-col gap-5">
                <p className="text-gray-500">We Accept</p>
                <div className="flex justify-between">
                  <img src="/bri.svg" alt="" />
                  <img src="/dana.svg" alt="" />
                  <img src="/bca.svg" alt="" />
                  <img src="/gopay.svg" alt="" />
                  <img src="/ovi.svg" alt="" />
                  <img src="/paypal.svg" alt="" />
                </div>
                <p className="text-gray-500">
                  *Get Discount if you pay with Bank Central Asia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
