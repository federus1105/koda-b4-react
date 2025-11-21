import React from "react";
import { paymentMethods } from "../../utils/common";

function PaymentOrder({ carts, selectedPayment, setSelectedPayment  }) {

  const subTotal = carts.reduce((acc, item) => {
    const price = item.price_discount > 0 ? item.price_discount : item.price;
    return acc + price * item.qty;
  }, 0);

  const delivery = 0;
  const tax = 0;


  const total = subTotal + delivery + tax;

  return (
    <div className="my-20 lg:w-1/3 lg:my-40">
      <div className="mt-10">
        <h1 className="my-5 font-medium text-xl lg:text-2xl">Total</h1>
        <div className="bg-gray-100 px-5 py-10 flex flex-col gap-6">
          <div className="flex justify-between">
            <p className="font-medium text-gray-500">Order</p>
            <p className="font-medium">IDR {subTotal.toLocaleString("id-ID")}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-500">Delivery</p>
            <p className="font-medium">IDR {delivery.toLocaleString("id-ID")}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-500">Tax</p>
            <p className="font-medium">IDR {tax.toLocaleString("id-ID")}</p>
          </div>

          <hr className="border border-gray-300" />
          <div className="flex justify-between">
            <p className="font-medium text-gray-500">Sub Total</p>
            <p className="font-medium">IDR {total.toLocaleString("id-ID")}</p>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col gap-3 mt-5">
            <p className="text-gray-500">We Accept</p>
            <div className="flex gap-2 flex-wrap justify-between">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  className={`p-1 rounded-md border transition ${
                    selectedPayment === method.id
                      ? "border-[#997950] bg-[#997950]"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <img src={method.img} alt={method.name} className="max-w-17 max-h-15 mx-auto" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default PaymentOrder;
