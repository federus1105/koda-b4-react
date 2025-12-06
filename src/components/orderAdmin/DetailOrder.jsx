import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { delay, statusOptions } from "../../utils/common";
import {
  AdminDetailOrder,
  AdminUpdateStatusOrder,
} from "../../services/orderService";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import ItemProductOrder from "./ItemProductOrder";

function DetailOrder({ open, onClose, id, token }) {
  const [data, setData] = useState(null);
  const { setLoading } = useOutletContext();
  const [statusLoading, setStatusLoading] = useState(false);

  // ---- GET DETAIL ORDER ---
  useEffect(() => {
    if (!open || !id) return;

    const fetchDetail = async () => {
      try {
        const res = await AdminDetailOrder(id, token);
        console.log(res);
        setData(res.result);
      } catch (err) {
        console.error("Error fetch detail order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [setLoading, open, id, token]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setData((prev) => ({ ...prev, status: newStatus }));
  };

  // --- Handle status ---
  const handlerStatus = async () => {
    if (!data?.status) {
      toast.error("Status tidak boleh kosong");
      return;
    }

    try {
      setStatusLoading(true);
      await delay(500);
      await AdminUpdateStatusOrder({ status: Number(data.status) }, id, token);

      toast.success("Status berhasil diperbarui!");
      onClose();
    } catch (err) {
      console.error("Error update status:", err);
      toast.error("Gagal update status");
    } finally {
      setStatusLoading(false);
    }
  };
  if (!open) return null;
  return (
    <>
      <section className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl z-50 overflow-y-auto animate-slideIn">
        <div className="p-6">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">{data?.orderNumber}</h1>
            <button type="button" onClick={onClose}>
              <X className="text-red-500 w-7 h-7 cursor-pointer hover:text-red-600" />
            </button>
          </div>

          {/* --- DATA ---  */}
          {data && (
            <>
              <h2 className="text-lg font-medium mb-3">Order Information</h2>

              <div className="space-y-5">
                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-600">Fullname</span>
                  <span className="font-medium">{data.fullname}</span>
                </div>
                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-600">Address</span>
                  <span className="font-medium">{data.address}</span>
                </div>
                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium">{data.phonenumber}</span>
                </div>
                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">{data.payment_method}</span>
                </div>
                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {data.delivery
                      ? data.delivery
                          .split("_")
                          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(" ")
                      : "-"}
                  </span>
                </div>

                {/* STATUS DROPDOWN */}
                <div className="flex justify-between border-b pb-3 items-center">
                  <span className="text-gray-600">Status</span>
                  <select
                    className="border rounded-md px-3 py-1 bg-gray-100"
                    value={data.status}
                    onChange={handleStatusChange}
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* TOTAL */}
                <div className="flex justify-between pt-3 text-lg font-semibold">
                  <span>Total Transaksi</span>
                  <span className="text-orange-600">
                    Idr {data.total?.toLocaleString()}
                  </span>
                </div>
                <hr />
                <ItemProductOrder products={data.products} />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  onClick={handlerStatus}
                  disabled={statusLoading}
                  className="w-full bg-brand text-white py-3 rounded-md font-semibold hover:bg-[#8b6c46]"
                >
                  Save Changes
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default DetailOrder;
