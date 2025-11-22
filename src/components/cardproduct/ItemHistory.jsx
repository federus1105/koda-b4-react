import React from "react";
import {
  GlassWater,
  Calendar,
  Repeat,
  RefreshCcw,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/common";

function ItemHistory({ item }) {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/detailorder/${item.id}`);
  };
  if (!history.length) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <GlassWater size={32} className="text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg">No order history yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full mx-auto px-4">
        <div className="flex flex-col gap-4">
          <div className="group bg-white hover:bg-gray-50 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Image Section */}
                <div className="flex-shrink-0">
                  <div className="relative w-full lg:w-28 h-32 lg:h-28 rounded-xl overflow-hidden bg-gray-100 shadow-md group-hover:shadow-lg ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover  group-hover:scale-105 duration-500"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col justify-between gap-6">
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {/* Order Number */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-lg">
                          <GlassWater size={16} className="text-blue-600" />
                        </div>
                        <span>No. Order</span>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm lg:text-base ml-10 lg:ml-0">
                        {item.order_number}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <div className="w-8 h-8 flex items-center justify-center bg-purple-50 rounded-lg">
                          <Calendar size={16} className="text-purple-600" />
                        </div>
                        <span>Date</span>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm lg:text-base ml-10 lg:ml-0">
                        {formatDate(item.date)}
                      </p>
                    </div>

                    {/* Total */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <div className="w-8 h-8 flex items-center justify-center bg-green-50 rounded-lg">
                          <Repeat size={16} className="text-green-600" />
                        </div>
                        <span>Total</span>
                      </div>
                      <p className="font-bold text-gray-900 text-sm lg:text-base ml-10 lg:ml-0">
                        IDR {item.total.toLocaleString("id-ID")}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <div className="w-8 h-8 flex items-center justify-center bg-amber-50 rounded-lg">
                          <RefreshCcw size={16} className="text-amber-600" />
                        </div>
                        <span>Status</span>
                      </div>
                      <div className="ml-10 lg:ml-0">
                        <span className="inline-flex items-center gap-1.5 bg-[#997950] px-3 py-1.5 text-white rounded-full text-xs lg:text-sm font-medium shadow-md">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                          On Progress
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className=" flex justify-end pt-2 border-t border-gray-100">
                    <button className="group/btn cursor-pointer  inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium text-sm lg:text-base"
                         onClick={handleViewDetail}>
                      <span className="relative ">
                        View Order Detail
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 group-hover/btn:w-full duration-300"></span>
                      </span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemHistory;
