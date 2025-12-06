import { PackageX } from "lucide-react";
import React from "react";

function ItemProductOrder({ products }) {
  return (
    <>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-50 p-3 rounded-md shadow-sm"
          >
            {/* IMAGE */}
            <img
              src={
                product.image ||
                "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
              }
              alt={product.product_name}
              className="w-20 h-20 object-cover rounded-md"
            />

            {/* INFO */}
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold">{product.product_name}</h2>
              <p className="text-sm text-gray-600">
                {product.quantity}pcs | {product.size} | {product.variant}
              </p>
            </div>

            {/* PRICE */}
            <div className="text-right">
              {product.price_discount > 0 && (
                <span className="line-through text-gray-400 block">
                  IDR {product.price_original.toLocaleString("id-ID")}
                </span>
              )}
              <span className="text-brand font-bold">
                IDR{" "}
                {(product.price_discount > 0
                  ? product.price_discount
                  : product.price_original
                ).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ItemProductOrder;
