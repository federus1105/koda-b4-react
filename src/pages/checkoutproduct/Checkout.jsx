import React, { useEffect, useState } from "react";
import { Plus, PackageX, Loader2 } from "lucide-react";
import ItemOrder from "../../components/cardproduct/ItemOrder";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DeleteCart, GetCart, OrderProduct } from "../../services/orderService";
import PaymentOrder from "../../components/payment/PaymentOrder";
import { useForm } from "react-hook-form";
import { delay, deliveryOptions } from "../../utils/common";
import ConfirmModal from "../../components/modal/ConfirmModal";

function Checkout() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const user = useSelector((state) => state.auth.currentUser);
  const [selectedCartId, setSelectedCartId] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingPay, setIsLoadingPay] = useState(false);
  const [delivery, setDelivery] = useState(null);
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();

  // --- GET CART ---
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const res = await GetCart(token);
        setCarts(res.result);
      } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan!, Silahkan coba lagi.");
      }
    };

    fetchCarts();
  }, [token]);


  // --- USE FORM ---
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email || "",
      fullname: user?.fullname || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  // --- HANDLE SUBMIT ---
  const onSubmit = async (data) => {
    if (!selectedPayment) {
      toast.error("Pilih metode pembayaran dulu!");
      return;
    }
    if (!delivery) {
      toast.error("Pilih metode delivery dulu!");
      return;
    }
    setIsLoadingPay(true);
    const payload = {
      fullname: data.fullname,
      address: data.address,
      phone: data.phone,
      email: data.email,
      id_paymentMethod: Number(selectedPayment),
      id_delivery: Number(delivery),
    };
    try {
      await Promise.all([OrderProduct(payload, token), delay(1200)]);
      toast.success("Berhasil checkout!");
      navigate("/history");
    } catch (err) {
      console.error(err);
      toast.error("Checkout gagal, coba lagi!");
    } finally {
      setIsLoadingPay(false);
    }
  };
  

  // --- HANDLE DELETE ---
  const handleDeleteClick = (id) => {
    setSelectedCartId(id);
    setShowDeleteModal(true);
  };

  // --- CONFIRM DELETE ---
  const confirmDelete = async () => {
    setIsLoadingDelete(true);

    try {
      await Promise.all([DeleteCart(selectedCartId, token), delay(900)]);

      setCarts((prev) => prev.filter((cart) => cart.id !== selectedCartId));
      toast.success("Berhasil menghapus item!");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus item!");
    } finally {
      setIsLoadingDelete(false);
      setShowDeleteModal(false);
      setSelectedCartId(null);
    }
  };

  // --- LOADING ---

  if (isLoadingDelete || isLoadingPay) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-16 h-16 animate-spin text-[#997950]" />
      </div>
    );
  }

  return (
    <>
      <div className="mx-5 md:mx-15 lg:flex gap-30 justify-center lg:mx-30">
        <div className="my-20 lg:w-1/3 lg:my-30">
          <h1 className="font-medium text-xl lg:text-3xl">Payment Details</h1>
          <div className="flex justify-between mt-8">
            <h1 className="font-medium text-xl">Your Order</h1>
            <Link to={"/product"}>
              <button className="cursor-pointer flex bg-[#997950] rounded-md py-2 px-4">
                <Plus /> Add Menu
              </button>
            </Link>
          </div>
          {/* Item Order */}
          <div className="my-5 flex flex-col gap-5">
            {carts.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
                <PackageX className="w-20 h-20 text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  Product Not Found
                </h3>
              </div>
            ) : (
              carts.map((item) => (
                <ItemOrder
                  key={item.id}
                  item={item}
                  onDelete={() => handleDeleteClick(item.id)}
                />
              ))
            )}
          </div>
          {/* Form */}
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <h1 className="font-medium">Payment & Info Delivery</h1>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="font-medium">Email</label>
                <input
                  type="text"
                  {...register("email", { required: "Email harus diisi" })}
                  placeholder="Enter Your Email"
                  className="w-full border rounded-md p-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Fullname */}
              <div className="flex flex-col gap-2">
                <label className="font-medium">Fullname</label>
                <input
                  type="text"
                  {...register("fullname", { required: "Nama harus diisi" })}
                  placeholder="Enter Your Full Name"
                  className="w-full border rounded-md p-2"
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm">
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="font-medium">Phone Number</label>
                <input
                  type="text"
                  {...register("phone", {
                    required: "Nomor telepon harus diisi",
                  })}
                  placeholder="Enter Your Phone Number"
                  className="w-full border rounded-md p-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <label className="font-medium">Address</label>
                <input
                  type="text"
                  {...register("address", { required: "Alamat harus diisi" })}
                  placeholder="Enter Your Address"
                  className="w-full border rounded-md p-2"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <h1 className="font-medium">Delivery</h1>

                <div className="flex gap-2">
                  {deliveryOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDelivery(opt.id)}
                      className={`cursor-pointer hover:bg-gray-100 border rounded-md py-2 px-4 w-full ${
                        delivery === opt.id
                          ? "bg-[#997950] text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="cursor-pointer bg-[#997950] w-full py-3 rounded-lg mt-5 text-white"
              >
                Checkout
              </button>
            </form>
          </div>
        </div>

        {/* --- CONFIRM MODAL --- */}
        <ConfirmModal
          isOpen={showDeleteModal}
          title="Hapus item?"
          message="Apakah kamu yakin ingin menghapus item ini dari keranjang?"
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />

        {/* --- PAYMENT --- */}
        <PaymentOrder
          carts={carts}
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
        />
      </div>
    </>
  );
}

export default Checkout;
