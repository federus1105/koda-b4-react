import React from "react";
import ItemOrder from "../../components/cardproduct/ItemOrder";
import {
  Car,
  HandHelping,
  MapPinCheck,
  Phone,
  RefreshCcw,
  UserPen,
} from "lucide-react";

function DetailOrder() {
  return (
    <>
      <div className="mx-5 my-25 flex flex-col gap-10 lg:flex-row lg:mx-30 md:mx-15 lg:my-30 lg:justify-center lg:gap-20">
        <div className="flex flex-col gap-3 lg:w-1/3">
          <h1 className="font-medium text-xl lg:text-3xl">Order #12354-09893</h1>
          <p className="text-gray-500">21 March 2023 at 10:30 AM</p>
          <div className="flex flex-col gap-4">
            <h1 className="font-medium">Order Information</h1>
            <div className="flex justify-between">
              <p className="flex gap-2 text-gray-700">
                <UserPen />
                Full Name
              </p>
              <p className="font-medium">Ghaluh Wizard Anggoro</p>
            </div>
            <hr className="text-gray-300" />
            <div className="flex justify-between">
              <p className="flex gap-2 text-gray-700">
                <MapPinCheck />
                Address
              </p>
              <p className="font-medium">Griya bandung indah</p>
            </div>
            <hr className="text-gray-300" />
            <div className="flex justify-between">
              <p className="flex gap-2 text-gray-700">
                <Phone size={20} />
                Phone
              </p>
              <p className="font-medium">082116304338</p>
            </div>
            <hr className="text-gray-300" />
            <div className="flex justify-between">
              <p className="flex gap-2 text-gray-700">
                <HandHelping />
                Payment Method
              </p>
              <p className="font-medium">Cash</p>
            </div>
            <hr className="text-gray-300" />
            <div className="flex justify-between">
              <p className="flex gap-2 text-gray-700">
                <Car />
                Shipping
              </p>
              <p className="font-medium">Dine In</p>
            </div>
            <hr className="text-gray-300" />
            <div className="flex justify-between">
              <p className="flex gap-2 text-gray-700">
                <RefreshCcw />
                Status
              </p>
              <p className="font-medium bg-green-300 text-green-600 rounded-xl px-2">
                Done
              </p>
            </div>
            <hr className="text-gray-300" />
            <div className="flex justify-between">
              <p className="text-gray-700">Total Transaksi</p>
              <p className="font-medium text-orange-400">idr. 40.000</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:w-1/3">
          <h1 className="font-medium">Your Order</h1>
          <ItemOrder />
        </div>
      </div>
    </>
  );
}

export default DetailOrder;
