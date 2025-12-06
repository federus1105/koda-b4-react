import React, { useCallback, useEffect, useState } from "react";
import { delay, formatDate, statusOptions } from "../../utils/common";
import { AdminOrderList } from "../../services/orderService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EditIcon, Funnel, Search, SearchIcon } from "lucide-react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import Paginations from "../../components/pagination/Paginations";
import SelectOption from "../../components/muiComponent/SelectOption";
import SearchInput from "../../components/muiComponent/SearchInput";
import DetailOrder from "../../components/orderAdmin/DetailOrder";

function OrderAdmin() {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const { setLoading } = useOutletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // --- SEARCH PARAMS ---
  const [searchParams, setSearchParams] = useSearchParams();
  const urlPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(urlPage);
  const [searchOrderNumber, setSearchOrderNumber] = useState(
    searchParams.get("ordernumber") || ""
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || ""
  );

  // ---- GET ORDER ---
  const getOrder = useCallback(
    async (filters = {}) => {
      try {
        setLoading(true);
        await delay(800);
        const result = await AdminOrderList(filters, token);
        setOrders(result.data);
        setCurrentPage(result.page);
        setTotalPages(result.totalPages || 1);
      } catch {
        toast.error("Terjadi kesalahan!, Silahkan coba lagi.");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, token]
  );

  useEffect(() => {
    const filters = {};

    const orderNumber = searchParams.get("ordernumber");
    if (orderNumber) filters.ordernumber = orderNumber;
    const status = searchParams.get("status");
    if (status) filters.status = status;

    const page = Number(searchParams.get("page")) || 1;
    getOrder({ ...filters, page });
    setCurrentPage(page);

    setStatusFilter(status || "");
  }, [getOrder, searchParams]);

  // --- HANDLER SEARCH ---
  const handleSearch = () => {
    const params = {};

    if (searchOrderNumber.trim()) params.ordernumber = searchOrderNumber.trim();
    if (statusFilter) params.status = statusFilter;

    params.page = 1;
    setSearchParams(params);
  };

  // --- MODAL ---
  const openDetailModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* --- HEADER ---- */}
        <section className="flex flex-col gap-3 lg:flex-row lg:justify-between">
          <div className="flex items-center justify-between flex-wrap gap-4 lg:flex-col lg:items-start lg:gap-2">
            <h1 className="font-medium text-xl">Order List</h1>
          </div>

          {/* --- FILTER --- */}
          <div>
            <div className="flex items-center justify-between gap-4">
              {/* --- SEARCH  --- */}
              <SearchInput
                label="Search Product"
                placeholder="Enter Order Number"
                value={searchOrderNumber}
                onChange={(e) => setSearchOrderNumber(e.target.value)}
                onEnter={handleSearch}
                fullWidth
                icon={<SearchIcon sx={{ color: "#9ca3af", mr: 1 }} />}
              />

              {/* --- DROPDOWN STATUS --- */}
              <SelectOption
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={statusOptions}
                placeholder="All Status"
              />

              <button
                className="cursor-pointer bg-brand text-white flex items-center rounded-md px-5 py-2 gap-2 hover:bg-[#8b6c46]"
                onClick={handleSearch}
              >
                <Funnel className="w-7 h-7" />
                Filter
              </button>
            </div>
          </div>
        </section>

        {/* --- TABLE --- */}
        <section className="p-4 bg-white rounded-lg border border-gray-300 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-left text-sm font-semibold">
              <tr>
                <th className="p-3">No</th>
                <th className="p-3">No. Order</th>
                <th className="p-3">Date</th>
                <th className="p-3">Order</th>
                <th className="p-3">Status</th>
                <th className="p-3">Total</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="flex flex-col items-center justify-center py-6 text-center text-gray-500 space-y-2">
                      <Search className="w-12 h-12 text-gray-300" />
                      <p className="text-lg font-semibold">Order not found</p>
                      <p className="text-sm text-gray-400">
                        Try adjusting your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((o, i) => (
                  <tr
                    key={o.id}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-3 text-gray-500 ">
                      {(currentPage - 1) * limit + (i + 1)}
                    </td>
                    <td className="p-3">{o.orderNumber}</td>
                    <td className="p-3 text-gray-500">{formatDate(o.date)}</td>
                    <td className="p-3 font-semibold text-gray-500 max-w-xs">
                      <ul className="list-disc list-inside space-y-1">
                        {o.order.map((item, idx) => (
                          <li key={idx}>
                            {item.name} {item.quantity}×
                          </li>
                        ))}
                      </ul>
                    </td>

                    <td className="p-3 text-sm">
                      <span
                        className={`px-3 py-1 rounded-xl font-medium
                        ${o.status === "on progres" ? "text-yellow-500" : ""}
                        ${o.status === "pending" ? " text-red-500" : ""}
                        ${o.status === "done" ? "text-green-500" : ""}`}
                      >
                        {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                      </span>
                    </td>

                    <td className="p-3 text-gray-500">{o.total}</td>
                    <td className="p-3">
                      <div className="inline-flex gap-3 items-center justify-center">
                        <button
                          className="cursor-pointer"
                          onClick={() => openDetailModal(o.id)}
                        >
                          <EditIcon className="w-5 h-5 text-blue-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* --- PAGINATION --- */}
        <div className="my-8">
          <Paginations
            totalPages={totalPages}
            currentPage={currentPage}
            onChange={(page) => {
              setCurrentPage(page);
              const params = {};

              if (searchOrderNumber) params.ordernumber = searchOrderNumber;
              if (statusFilter) params.status = statusFilter;

              params.page = page;

              setSearchParams(params);
              getOrder(params);
            }}
            siblingCount={1}
            boundaryCount={0}
          />
        </div>
      </div>
      <DetailOrder
        open={isModalOpen}
        onClose={closeDetailModal}
        id={selectedId}
        token={token}
      />
    </>
  );
}

export default OrderAdmin;
