import {
  ChevronLeft,
  ChevronRight,
  EditIcon,
  Funnel,
  Plus,
  Search,
  TrashIcon,
} from "lucide-react";
import React, { useState } from "react";
import ModalCreate from "../../components/productAdmin/ModalCreate";

function ProductAdmin() {
  const [active, setActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const products = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop",
      name: "Caramel Machiato",
      price: "40.000",
      desc: "Cold brewing",
      size: "R,L,XL",
      method: "Deliver, Dine In",
      stock: 200,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=200&h=200&fit=crop",
      name: "Hazelnut Latte",
      price: "40.000",
      desc: "Cold brewing",
      size: "R,L,XL",
      method: "Deliver, Dine In",
      stock: 200,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&h=200&fit=crop",
      name: "Kopi Susu",
      price: "40.000",
      desc: "Cold brewing",
      size: "R,L,XL",
      method: "Dine In",
      stock: 200,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=200&h=200&fit=crop",
      name: "Espresso Supreme",
      price: "40.000",
      desc: "Cold brewing",
      size: "R,L,XL",
      method: "Deliver",
      stock: 200,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop",
      name: "Caramel Velvet Latte",
      price: "40.000",
      desc: "Cold brewing",
      size: "R,L,XL",
      method: "Deliver, Dine In",
      stock: 200,
    },
  ];
  const totalPages = 9;

  const CreateModal = async () => {
    setActive(true);
  };
  return (
    <>
      <div className="flex flex-col gap-5">
        {active && <div className="absolute h-min-screen inset-0  backdrop-brightness-50" />}
        {active && ModalCreate}
        {/* --- HEADER ---- */}
        <section className="flex flex-col gap-3 lg:flex-row lg:justify-between">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4 lg:flex-col lg:items-start lg:gap-2">
            <h1 className="font-medium text-xl">Product List</h1>

            <button
              className="cursor-pointer bg-orange-500 text-white flex items-center rounded-md px-5 py-2 gap-2 hover:bg-orange-600"
              onClick={CreateModal}
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>

          {/* Search & Filter */}
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
                />
                <Search className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>

              <button className="cursor-pointer bg-orange-500 text-white flex items-center rounded-md px-5 py-2 gap-2 hover:bg-orange-600">
                <Funnel className="w-7 h-7" />
                Filter
              </button>
            </div>
          </div>
        </section>
        {/* --- TABLE --- */}
        <section className="p-4 bg-white rounded-lg border border-gray-300 overflow-x-auto">
          <table className="min-w-full border-collapse">
            {/* --- HEADER --- */}
            <thead className="bg-gray-100 text-gray-600 text-left text-sm font-semibold">
              <tr>
                <th className="p-3">No</th>
                <th className="p-3">Image</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Desc</th>
                <th className="p-3">Product Size</th>
                <th className="p-3">Method</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            {/* --- BODY --- */}
            <tbody>
              {products.map((p, i) => (
                <tr
                  key={p.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-3 text-gray-500">{p.id}</td>
                  <td className="p-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="p-3 text-gray-500">{p.name}</td>
                  <td className="p-3 font-semibold text-gray-500 flex gap-2">
                    <span className="hidden lg:block">IDR</span> {p.price}
                  </td>
                  <td className="p-3 max-w-xs text-sm text-gray-500 truncate">
                    {p.desc}
                  </td>
                  <td className="p-3 text-gray-500">{p.size}</td>
                  <td className="p-3 text-gray-500">{p.method}</td>
                  <td className="p-3 text-gray-500">{p.stock}</td>
                  <td className="p-3">
                    <div className="inline-flex gap-3 items-center justify-center">
                      <button className="cursor-pointer" aria-label="Edit">
                        <EditIcon className="w-5 h-5 text-orange-400" />
                      </button>
                      <button className="cursor-pointer" aria-label="Delete">
                        <TrashIcon className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {/* Pagination */}
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              Show <span className="font-semibold">5</span> product of{" "}
              <span className="font-semibold">100</span> product
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-50"
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg font-medium ${
                      currentPage === page
                        ? "bg-orange-500 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductAdmin;
