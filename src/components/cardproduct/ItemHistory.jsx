import React from "react";
import { GlassWater, Calendar, Repeat, RefreshCcw } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/common";

function ItemHistory() {
  const history = useSelector((state) => state.order.orderHistory);
  console.log(history);

  if (!history.length) {
    return <p className="text-center text-gray-500">No order history yet.</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        {history.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-gray-100 px-5 py-5 flex flex-col lg:flex-row lg:flex-wrap gap-7 lg:justify-between rounded-lg"
            >
              <div className="hidden lg:block">
                <img
                  src={item.selectedProduct.image}
                  alt={item.selectedProduct.name}
                  className="w-15 h-20"
                />
              </div>
              <div className="flex justify-between lg:gap-15">
                <div className="flex flex-col gap-2">
                  <p className="flex gap-2 items-center">
                    <GlassWater size={18} />
                    No. Order
                  </p>
                  <p className="font-medium">#{item.id || Date.now()}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="flex gap-2 items-center">
                    <Calendar size={18} />
                    Date
                  </p>
                  <p className="font-medium">
                    {formatDate(item.timestamp || Date.now())}
                  </p>
                </div>
              </div>

              <div className="flex justify-between lg:gap-15">
                <div className="flex flex-col gap-2">
                  <p className="flex gap-2 items-center">
                    <Repeat size={18} />
                    Total
                  </p>
                  <p className="font-medium">
                    IDR {item.total.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="flex gap-2 items-center">
                    <RefreshCcw size={18} />
                    Status
                  </p>
                  <p className="font-medium bg-orange-300 px-4 py-1 text-orange-700 rounded-lg">
                    On Progress
                  </p>
                </div>
              </div>
              {/* 
              {item.id ? ( */}
              <Link to={`/detailorder/${history[0].id}`}>
                <p className="text-orange-500 underline cursor-pointer">
                  View Order Detail
                </p>
              </Link>
              {/* ) : (
                <p className="text-gray-400 italic">No ID available</p>
              )} */}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ItemHistory;
