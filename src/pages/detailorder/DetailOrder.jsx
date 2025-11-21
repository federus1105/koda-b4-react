import React from "react";
import {
  Car,
  HandHelping,
  MapPinCheck,
  Phone,
  RefreshCcw,
  UserPen,
} from "lucide-react";
import ItemDetailOrder from "../../components/cardproduct/ItemDetailOrder";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/common";
import { useParams } from "react-router-dom";

function DetailOrder() {
  const { id } = useParams();
  const history = useSelector((state) => state.order.orderHistory);
    const order = history[+id];

  if (!order) {
    return <p className="text-center mt-10">Order not found</p>;
  }

  return (
    <>
      <div className="mx-5 my-25 flex flex-col gap-10 lg:flex-row lg:mx-30 md:mx-15 lg:my-30 lg:justify-center lg:gap-20">
        <div className="flex flex-col gap-3 lg:w-1/3">
          <h1 className="font-medium text-xl lg:text-3xl">#{order.id}</h1>
          <p className="text-gray-500">{formatDate(order.timestamp)}</p>
          <div className="flex flex-col gap-4">
            <h1 className="font-medium">Order Information</h1>

            <div className="flex justify-between">
              <p className="flex gap-2 text-gray-700">
                <UserPen />
                Full Name
              </p>
              <p className="font-medium">{order.fullname}</p>
            </div>

            <hr className="text-gray-300" />
            <div className="flex justify-between">
              <p className="flex gap-2 text-gray-700">
                <MapPinCheck />
                Address
              </p>
              <p className="font-medium">{order.address}</p>
            </div>

            <hr className="text-gray-300" />
            <div className="flex justify-between">
              <p className="flex gap-2 text-gray-700">
                <Phone size={20} />
                Phone
              </p>
              <p className="font-medium">{order.phone || "N/A"}</p>
            </div>

            <hr className="text-gray-300" />
            <div className="flex justify-between">
              <p className="flex gap-2 text-gray-700">
                <HandHelping />
                Payment Method
              </p>
              <p className="font-medium">{order.payment}</p>
            </div>

            <hr className="text-gray-300" />
            <div className="flex justify-between">
              <p className="flex gap-2 text-gray-700">
                <Car />
                Shipping
              </p>
              <p className="font-medium">{order.delivery}</p>
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
              <p className="font-medium text-orange-400">
                IDR {order.total?.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:w-1/3">
          <h1 className="font-medium">Your Order</h1>
          <ItemDetailOrder order={order.selectedProduct} />
        </div>
      </div>
    </>
  );
}

export default DetailOrder;
