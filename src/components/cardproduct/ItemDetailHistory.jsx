import React from "react";

function ItemDetailHistory({ item }) {
  return (
    <>
      <div className="cursor-pointer relative flex gap-4 p-4 rounded-xl bg-white shadow-md border border-gray-100">
        {item.flash_Sale && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
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
              {item.size || "No Size"}
            </span>
            <span className="px-2 py-0.5 bg-gray-100 rounded-md">
              {item.variant || "No Variant "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemDetailHistory;
