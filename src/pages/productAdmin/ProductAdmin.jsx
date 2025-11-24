import {
  EditIcon,
  Funnel,
  Loader2,
  Plus,
  Search,
  TrashIcon,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import ModalCreate from "../../components/productAdmin/ModalCreate";
import {
  AdminDeleteProduct,
  AdminProductList,
} from "../../services/productService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ConfirmModal from "../../components/modal/ConfirmModal";
import { delay } from "../../utils/common";
import ModalUpdate from "../../components/productAdmin/ModalUpdate";
import { useSearchParams } from "react-router-dom";
import Paginations from "../../components/pagination/Paginations";

function ProductAdmin() {
  const token = useSelector((state) => state.auth.token);
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState({ type: null, data: null });
  const [loading, setLoading] = useState({ get: true, delete: false });
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  // --- SEARCH PARAMS ---
  const [searchParams, setSearchParams] = useSearchParams();
  const urlPage = Number(searchParams.get("page")) || 1;
  const urlName = searchParams.get("name") || "";
  const [searchName, setSearchName] = useState(urlName);
  const [currentPage, setCurrentPage] = useState(urlPage);

  // GET PRODUCT
  const getProduct = useCallback(
    async (filters = {}) => {
      try {
        setLoading((prev) => ({ ...prev, get: true }));
        await delay(800);

        const result = await AdminProductList(filters, token);
        setProducts(result.data);
        setTotalPages(result.totalPages);
        setCurrentPage(result.page);
      } catch {
        toast.error("Terjadi kesalahan!, Silahkan coba lagi.");
      } finally {
        setLoading((prev) => ({ ...prev, get: false }));
      }
    },
    [token]
  );

  // FIRST LOAD
  useEffect(() => {
    const filters = {};

    if (urlName) filters.name = urlName;
    if (urlPage) filters.page = urlPage;

    getProduct(filters);
  }, [urlName, urlPage, getProduct]);

  // FILTER
  const handleFilter = () => {
    const params = {};

    if (searchName) params.name = searchName;
    params.page = 1;

    setSearchParams(params);
    getProduct(params);
  };

  // OPEN/CLOSE MODAL
  const openModal = (type, data = null) => setModal({ type, data });
  const closeModal = () => setModal({ type: null, data: null });

  // DELETE
  const handleDelete = async () => {
    try {
      setLoading((l) => ({ ...l, delete: true }));
      await delay(600);

      await AdminDeleteProduct(modal.data, token);
      setProducts((p) => p.filter((item) => item.id !== modal.data));

      toast.success("Product berhasil dihapus!");
    } catch {
      toast.error("Gagal menghapus product!");
    } finally {
      setLoading((l) => ({ ...l, delete: false }));
      closeModal();
    }
  };

  // LOADING OVERLAY
  if (loading.get || loading.delete) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Loader2 className="w-16 h-16 animate-spin text-[#997950]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Backdrop */}
      {modal.type && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={closeModal} />
      )}

      {/* CREATE MODAL */}
      {modal.type === "create" && <ModalCreate onClose={closeModal} />}

      {/* UPDATE MODAL */}
      {modal.type === "update" && (
        <ModalUpdate product={modal.data} onClose={closeModal} />
      )}

      {/* DELETE CONFIRMATION */}
      {modal.type === "delete" && (
        <ConfirmModal
          isOpen={true}
          title="Hapus Product"
          message="Apakah kamu yakin ingin menghapus product ini?"
          onConfirm={handleDelete}
          onCancel={closeModal}
        />
      )}

      {/* --- HEADER ---- */}
      <section className="flex flex-col gap-3 lg:flex-row lg:justify-between">
        <div className="flex items-center justify-between flex-wrap gap-4 lg:flex-col lg:items-start lg:gap-2">
          <h1 className="font-medium text-xl">Product List</h1>

          <button
            className="cursor-pointer bg-[#997950] text-white flex items-center rounded-md px-5 py-2 gap-2 hover:bg-[#8b6c46]"
            onClick={() => openModal("create")}
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Search */}
        <div>
          <label className="hidden lg:block text-sm font-medium text-gray-600 mb-1">
            Search Product
          </label>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Product Name"
                className="w-full border rounded-md border-gray-300 px-4 py-3"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Search className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={handleFilter}
              className="cursor-pointer bg-[#997950] text-white flex items-center rounded-md px-5 py-2 gap-2 hover:bg-[#8b6c46]"
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
              <th className="p-3">Image</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Desc</th>
              <th className="p-3">Product Size</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p, i) => (
              <tr
                key={p.id}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-3 text-gray-500">
                  {" "}
                  {(currentPage - 1) * limit + (i + 1)}
                </td>
                <td className="p-3">
                  <img
                    src={p.images.photos_one}
                    alt={p.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                </td>
                <td className="p-3 text-gray-500">{p.name}</td>
                <td className="p-3 font-semibold text-gray-500 flex gap-2">
                  <span className="hidden lg:block">IDR</span> {p.price}
                </td>
                <td className="p-3 max-w-xs text-sm text-gray-500">
                  {p.description.length > 50
                    ? p.description.substring(0, 30) + "..."
                    : p.description}
                </td>
                <td className="p-3 text-gray-500">{p.size.join(", ")}</td>
                <td className="p-3 text-gray-500">{p.stock}</td>

                <td className="p-3">
                  <div className="inline-flex gap-3 items-center justify-center">
                    {/* EDIT */}
                    <button
                      className="cursor-pointer"
                      aria-label="Edit"
                      onClick={() => openModal("update", p)}
                    >
                      <EditIcon className="w-5 h-5 text-blue-500" />
                    </button>

                    {/* DELETE */}
                    <button
                      className="cursor-pointer"
                      aria-label="Delete"
                      onClick={() => openModal("delete", p.id)}
                    >
                      <TrashIcon className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* --- Pagination --- */}
      <div className="my-8">
        <Paginations
          totalPages={totalPages}
          currentPage={currentPage}
          onChange={(page) => {
            setCurrentPage(page);
            const params = {};
            if (searchName) params.name = searchName;
            params.page = page;
            setSearchParams(params);
            getProduct(params);
          }}
          siblingCount={1}
          boundaryCount={0}
        />
      </div>
    </div>
  );
}

export default ProductAdmin;
