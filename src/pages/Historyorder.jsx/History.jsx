import React, { useEffect, useState } from "react";
import { Calendar, MoveRight, MessageSquareMore, PackageX } from "lucide-react";
import ItemHistory from "../../components/cardproduct/ItemHistory";
import { useSelector } from "react-redux";
import { historyUser } from "../../services/historyService";
import { toast } from "react-toastify";
import { delay, months } from "../../utils/common";
import { useOutletContext } from "react-router-dom";

function History() {
  const token = useSelector((state) => state.auth.token);
  const [history, setHistory] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const { setLoading } = useOutletContext();

  // --- GET CART ---
  useEffect(() => {
    setLoading(true);
    const fetchistory = async () => {
      try {
        const res = await historyUser(
          { status: statusFilter, month: monthFilter },
          token
        );
        await delay(400);
        setHistory(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan!, Silahkan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchistory();
  }, [setLoading, token, statusFilter, monthFilter]);

  const status = [
    { id: 1, label: "On Progress" },
    { id: 2, label: "Pending" },
    { id: 3, label: "Done" },
    { id: "", label: "All" },
  ];
  return (
    <>
      <div className="my-20 mx-5 lg:mx-30 lg:my-30 flex justify-center">
        <div className="flex flex-col gap-8 w-full lg:max-w-3xl">
          {/* Title */}
          <header>
            <h1 className="font-medium text-xl lg:text-3xl">History Order</h1>
          </header>

          {/* Filters Group */}
          <section className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Month Filter */}
            <div className="bg-gray-100 rounded flex items-center gap-3 py-2 px-3 w-fit">
              <Calendar className="text-gray-600" />

              <div className="relative">
                <select
                  value={monthFilter}
                  onChange={(e) => setMonthFilter(e.target.value)}
                  className="cursor-pointer appearance-none px-3 py-2 rounded border bg-white pr-7"
                >
                  <option value="">All Months</option>
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>

                {/* Arrow icon */}
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  ▼
                </span>
              </div>
            </div>

            {/* Status Filter */}
            <div className="bg-gray-100 flex items-center gap-2 py-3 px-4 rounded">
              {status.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStatusFilter(s.id)}
                  className={`px-3 py-1 rounded cursor-pointer transition ${
                    statusFilter === s.id
                      ? "bg-brand text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </section>

          {/* History List */}
          <section className="my-4 flex flex-col gap-6 min-h-[800px]">
            {history.length === 0 ? (
              <div className="flex flex-col justify-center items-center text-center px-4 py-10 w-full h-full">
                <PackageX className="w-20 h-20 text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-700">
                  Product Not Found
                </h3>
              </div>
            ) : (
              history.map((item) => <ItemHistory key={item.id} item={item} />)
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default History;
