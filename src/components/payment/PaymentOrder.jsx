import React from "react";
import { paymentMethods } from "../../utils/common";

function PaymentOrder({
  carts,
  selectedPayment,
  setSelectedPayment,
  selectedDelivery,
  deliveryOptions,
}) {
  const subTotal = carts.reduce((acc, item) => {
    const price =
      item.discount > 0 && item.flash_sale == true ? item.discount : item.price;
    return acc + price * item.qty;
  }, 0);

  const deliveryFee =
    deliveryOptions.find((opt) => opt.id === selectedDelivery)?.fee || 0;
  const tax = 2000;

  const total = subTotal + deliveryFee + tax;

  return (
    <div className="lg:w-1/3 my-20 lg:my-40">
      {/* Card Total */}
      <section className="bg-gray-100 p-6 mt-10 space-y-6">
        <header>
          <h1 className="font-medium text-xl lg:text-2xl">Total</h1>
        </header>

        {/* List Price */}
        <ul className="space-y-4">
          <li className="flex justify-between">
            <span className="text-gray-500 font-medium">Order</span>
            <span className="font-medium">
              IDR {subTotal.toLocaleString("id-ID")}
            </span>
          </li>

          <li className="flex justify-between">
            <span className="text-gray-500 font-medium">Delivery</span>
            <span className="font-medium">
              IDR {deliveryFee.toLocaleString("id-ID")}
            </span>
          </li>

          <li className="flex justify-between">
            <span className="text-gray-500 font-medium">Tax</span>
            <span className="font-medium">
              IDR {tax.toLocaleString("id-ID")}
            </span>
          </li>
        </ul>

        <div className="border border-gray-300" />

        {/* Subtotal */}
        <div className="flex justify-between">
          <p className="text-gray-500 font-medium">Sub Total</p>
          <p className="font-medium">IDR {total.toLocaleString("id-ID")}</p>
        </div>
      </section>

      {/* Card Payment */}
      <section className="bg-gray-100 p-6 mt-6">
        <p className="text-gray-500 mb-3">We Accept</p>

        <div className="grid grid-cols-3 gap-3">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex justify-center">
              <button
                onClick={() => setSelectedPayment(method.id)}
                className={`p-1 rounded-md border-2 w-full flex items-center justify-center ${
                  selectedPayment === method.id
                    ? "border-gray-300 bg-gray-200"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={method.img}
                  alt={method.name}
                  className={`max-w-17 max-h-15 ${
                    selectedPayment === method.id ? "opacity-60" : "opacity-100"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PaymentOrder;
