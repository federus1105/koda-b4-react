import React from "react";

function ItemDetailHistory({ item }) {
  return (
    <>
      <div className="relative flex gap-4 p-4 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        {item.flash_sale && (
          <div className="absolute -top-2 -left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
            FLASH SALE
          </div>
        )}

        {/* Gambar Produk */}
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
        />

        {/* Info Produk */}
        <div className="flex flex-col justify-center">
          <h1 className="text-base font-semibold text-gray-800">{item.name}</h1>

          <div className="flex gap-2 mt-2 text-xs text-gray-600">
            <span className="px-2 py-0.5 bg-gray-100 rounded-md">
              {item.quantity} pcs
            </span>
            <span className="px-2 py-0.5 bg-gray-100 rounded-md">
              {item.size}
            </span>
            <span className="px-2 py-0.5 bg-gray-100 rounded-md">
              {item.variant}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemDetailHistory;
