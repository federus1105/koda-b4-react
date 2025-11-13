import React from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";

function ItemOrder() {
  const item = useSelector((state) => state.order.orderInfo);
  console.log(item);
  return (
    <>
      <div className="rounded-md p-4 relative flex gap-4 bg-gray-200">
        {/*--- BUTTON CLOSE --- */}
        <button className="absolute top-2 right-2 text-red-500 hover:text-red-700">
          <X size={20} />
        </button>

        {/* --- IMAGE --- */}
        <img
          src="/coffe1.svg"
          alt="Hazelnut Latte"
          className="w-20 h-20 object-cover rounded"
        />

        {/* --- PRODUCT INFO --- */}
        <div className="flex flex-col justify-between w-full">
          {/* Badge */}
          {item.selectedProduct.flash_sale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              FLASH SALE!
            </div>
          )}

          {/* --- NAME --- */}
          <h1 className="text-lg font-semibold mt-1">
            {item.selectedProduct.name}
          </h1>

          {/* --- DETAIL --- */}
          <p className="text-gray-600 text-sm mt-1 flex flex-wrap gap-2">
            <span>{item.pieces}pcs</span>
            <span>|</span>
            <span>{item.size}</span>
            <span>|</span>
            <span>{item.variant}</span>
          </p>

          {/* --- PRICE --- */}
          <div className="flex items-center gap-2 mt-2">
            <p className="text-orange-600 font-semibold text-base">
              {item.selectedProduct.price_discount}
              {item.selectedProduct.price_original >
                item.selectedProduct.price_discount && (
                <span className="line-through text-xs text-gray-500 ml-2">
                  IDR{" "}
                  {item.selectedProduct.price_original.toLocaleString("id-ID")}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemOrder;
