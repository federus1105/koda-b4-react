import React from "react";
import { X } from "lucide-react";

function ItemOrder() {
  return (
    <>
      <div className="rounded-md p-4 relative flex gap-4 bg-gray-200">
        {/* Tombol Close */}
        <button className="absolute top-2 right-2 text-red-500 hover:text-red-700">
          <X size={20} />
        </button>

        {/* Gambar */}
        <img
          src="/coffe1.svg"
          alt="Hazelnut Latte"
          className="w-20 h-20 object-cover rounded"
        />

        {/* Info Produk */}
        <div className="flex flex-col justify-between w-full">
          {/* Badge */}
          <span className="bg-red-700 text-white text-xs px-3 py-1 rounded-full self-start font-semibold">
            FLASH SALE!
          </span>

          {/* Nama Produk */}
          <h1 className="text-lg font-semibold mt-1">Hazelnut Latte</h1>

          {/* Detail */}
          <p className="text-gray-600 text-sm mt-1 flex flex-wrap gap-2">
            <span>2pcs</span>
            <span>|</span>
            <span>Regular</span>
            <span>|</span>
            <span>Ice</span>
            <span>|</span>
            <span>Dine In</span>
          </p>

          {/* Harga */}
          <div className="flex items-center gap-2 mt-2">
            <span className="line-through text-red-600 text-sm">IDR40.000</span>
            <span className="text-orange-500 font-bold text-lg">
              IDR 20.000
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemOrder;
