import React, { useEffect, useState } from "react";
import { Calendar, MoveRight, MessageSquareMore, PackageX } from "lucide-react";
import ItemHistory from "../../components/cardproduct/ItemHistory";
import { useSelector } from "react-redux";
import { historyUser } from "../../services/historyService";
import { toast } from "react-toastify";
import { months } from "../../utils/common";

function History() {
  const token = useSelector((state) => state.auth.token);
  const [history, setHistory] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  // --- GET CART ---
  useEffect(() => {
    setIsLoading(true);
    const fetchistory = async () => {
      try {
        const res = await historyUser(
          { status: statusFilter, month: monthFilter },
          token
        );
        setHistory(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan!, Silahkan coba lagi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchistory();
  }, [token, statusFilter, monthFilter]);

  
  return (
    <>
      <div className="my-20 mx-5 lg:flex lg:mx-30 justify-center gap-20 md:mx-15 lg:my-30">
        <div className="flex flex-col gap-5">
          <h1 className="font-medium text-xl lg:text-3xl">History Order</h1>
          <div className="flex flex-col gap-3 lg:flex-row-reverse">
            <div className="flex items-center bg-gray-100 py-3 px-2 gap-2 w-fit">
              <Calendar />
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="px-2 py-1 rounded border"
              >
                <option value="">All Months</option>
                {months.map((month, index) => (
                  <option key={index + 1} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-gray-100 py-3 px-4 flex justify-between lg:gap-4">
              <button
                onClick={() => setStatusFilter(1)}
                className={`px-3 py-1 rounded ${
                  statusFilter === 1
                    ? "bg-[#997950] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                On Progress
              </button>
              <button
                onClick={() => setStatusFilter(2)}
                className={`px-3 py-1 rounded ${
                  statusFilter === 2
                    ? "bg-[#997950] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setStatusFilter(3)}
                className={`px-3 py-1 rounded ${
                  statusFilter === 3
                    ? "bg-[#997950] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Done
              </button>
              <button
                onClick={() => setStatusFilter("")}
                className={`px-3 py-1 rounded ${
                  statusFilter === ""
                    ? "bg-[#997950] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                All
              </button>
            </div>
          </div>
          {/* Item Order */}

          <div className="my-5 flex flex-col gap-5">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-full text-center px-4">
                <PackageX className="w-20 h-20 text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  Product Not Found
                </h3>
              </div>
            ) : (
              history.map((item) => <ItemHistory key={item.id} item={item} />)
            )}
          </div>
          {/* Paganitaion */}
          {/* <div className="mb-10">
            <div className="flex items-center justify-center gap-2 mt-10">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  className="w-10 h-10 rounded-full bg-gray-200 text-gray-400 active:bg-[#997950]"
                >
                  {num}
                </button>
              ))}
              <button className="w-9 h-9 rounded-full flex items-center justify-center bg-[#997950]">
                <MoveRight className="text-white" />
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default History;
