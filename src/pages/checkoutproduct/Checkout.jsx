import React, { useEffect } from "react";
import { Plus, UserRoundPen, Mail, MapPinCheck } from "lucide-react";
import ItemOrder from "../../components/cardproduct/ItemOrder";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addToHistory,
  resetOrder,
  setFullname,
  setPayment,
  setAddress,
  setDeliveri,
  setTotal,
} from "../../redux/slice/orderSlice";
import { toast } from "react-toastify";

function Checkout() {
  const selectedPayment = useSelector((state) => state.order.orderInfo.payment);
  const user = useSelector((state) => state.auth.currentUser);
  const product = useSelector((state) => state.order.orderInfo);
  const { selectedProduct, pieces } = useSelector(
    (state) => state.order.orderInfo
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePaymentClick = (method) => {
    dispatch(setPayment(method));
  };

  const deliveryFee = 5000;
  const tax = 2000;
  const itemTotal = selectedProduct?.price_discount * pieces || 0;
  const subTotal = itemTotal + deliveryFee + tax;

  useEffect(() => {
    if (user.fullname) {
      dispatch(setFullname(user.fullname));
    }
  }, [user.fullname, dispatch]);

  useEffect(() => {
    dispatch(setTotal(subTotal));
  }, [subTotal, dispatch]);

  const handleCheckout = () => {
    dispatch(addToHistory());
    dispatch(resetOrder());
    toast.success("Anda berhasil Order");
    navigate("/history");
  };

  return (
    <>
      <div className="mx-5 md:mx-15 lg:flex gap-30 justify-center lg:mx-30">
        <div className="my-20 lg:w-1/3 lg:my-30">
          <h1 className="font-medium text-xl lg:text-3xl">Payment Details</h1>
          <div className="flex justify-between mt-8">
            <h1 className="font-medium text-xl">Your Order</h1>
            <button className="flex bg-orange-400 rounded-md py-2 px-4">
              <Plus /> Add Menu
            </button>
          </div>
          {/* Item Order */}
          <div className="my-5 flex flex-col gap-5">
            <ItemOrder />
          </div>
          {/* Form */}
          <div>
            <form className="flex flex-col gap-4">
              <h1 className="font-medium">Payment & Info Delivery</h1>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <div className="flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                  <Mail />
                  <input
                    type="text"
                    id="email"
                    value={user.email}
                    placeholder="Enter Your Email"
                    className="w-full outline-none"
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="fullname" className="font-medium">
                  Fullname
                </label>
                <div className="flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                  <UserRoundPen />
                  <input
                    type="text"
                    id="fullname"
                    value={user.fullname}
                    placeholder="Enter Your Full Name"
                    className="w-full outline-none"
                    onChange={(e) => dispatch(setFullname(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="addres" className="font-medium">
                  Address
                </label>
                <div className=" flex items-center border border-t border-gray-300 bg-gray-50 rounded-[8px] py-1.5 px-2.5 w-full gap-3 h-11">
                  <MapPinCheck />
                  <input
                    type="text"
                    id="address"
                    value={user.address}
                    placeholder="Enter Your Address"
                    className="w-full outline-none"
                    onChange={(e) => dispatch(setAddress(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="font-medium">Delivery</h1>

                <div className="flex justify-between gap-2">
                  {["Dine In", "Door Delivery", "Pick Up"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => dispatch(setDeliveri(option))}
                      className={`border rounded-md py-2 px-6 w-full ${
                        product.delivery === option
                          ? "bg-orange-400 text-white border-orange-400"
                          : "border-gray-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="my-20 lg:w-1/3 lg:my-40">
          {/* Card Payment*/}
          <div className="mt-10">
            <h1 className="my-5 font-medium text-xl lg:text-2xl">Total</h1>
            <div className="bg-gray-100 px-5 py-10 flex flex-col gap-6">
              <div className="flex justify-between">
                <p className="font-medium text-gray-500">Order</p>
                <p className="font-medium">
                  IDR {itemTotal.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-gray-500">Delivery</p>
                <p className="font-medium">
                  IDR {deliveryFee.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-gray-500">Tax</p>
                <p className="font-medium">IDR {tax.toLocaleString("id-ID")}</p>
              </div>
              <hr className="border border-gray-300" />
              <div className="flex justify-between">
                <p className="font-medium text-gray-500">Sub Total</p>
                <p className="font-medium">
                  IDR {subTotal.toLocaleString("id-ID")}
                </p>
              </div>

              <button
                className="bg-orange-400 w-full py-3 rounded-lg cursor-pointer"
                onClick={handleCheckout}
              >
                Checkout
              </button>
              <div className="flex flex-col gap-5">
                <p className="text-gray-500">We Accept</p>
                <div className="flex justify-between gap-2">
                  {[
                    { name: "bri", img: "/bri.svg" },
                    { name: "dana", img: "/dana.svg" },
                    { name: "bca", img: "/bca.svg" },
                    { name: "gopay", img: "/gopay.svg" },
                    { name: "ovo", img: "/ovo.svg" },
                    { name: "paypal", img: "/paypal.svg" },
                  ].map((method) => (
                    <button
                      key={method.name}
                      onClick={() => handlePaymentClick(method.name)}
                      className={`p-1 rounded-md border transition ${
                        selectedPayment === method.name
                          ? "border-orange-500 bg-orange-100"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={method.img}
                        alt={method.name}
                        className="h-8 w-auto"
                      />
                    </button>
                  ))}
                </div>
                <p className="text-gray-500">
                  *Get Discount if you pay with Bank Central Asia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
