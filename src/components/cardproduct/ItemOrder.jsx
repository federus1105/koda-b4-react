import React from "react";
import { X } from "lucide-react";

function ItemOrder({ item, onDelete }) {
  if (!item) return null;

  return (
    <>
      <div className="rounded-md p-4 relative flex gap-4 bg-gray-200">
        {/* --- BUTTON CLOSE --- */}
        <button
          className="cursor-pointer absolute top-2 right-2 text-red-500 hover:text-red-700"
          onClick={onDelete}
        >
          <X size={20} />
        </button>

        {/* --- IMAGE --- */}
        <img
          src={item.images}
          alt={item.name}
          className="w-20 h-20 object-cover object-center rounded"
        />
        {/* --- PRODUCT INFO --- */}
        <div className="flex flex-col justify-between w-full">
          {item.flash_sale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              FLASH SALE!
            </div>
          )}
          <h1 className="text-lg font-semibold mt-1">{item.name}</h1>

          <p className="text-gray-600 text-sm mt-1 flex flex-wrap gap-2">
            <span>{item.qty} pcs</span>
            <span>|</span>
            <span>{item.size}</span>
            <span>|</span>
            <span>{item.variant}</span>
          </p>

          <div className="flex items-center gap-2 mt-2">
            <p className="text-brand font-bold text-base">
              IDR{" "}
              {item.discount > 0
                ? item.discount.toLocaleString("id-ID")
                : item.price.toLocaleString("id-ID")}
              {item.discount > 0 && (
                <span className="line-through text-xs text-gray-400 ml-2">
                  IDR {item.price.toLocaleString("id-ID")}
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
