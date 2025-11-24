import { Search, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import ItemsProduct from "../../components/cardproduct/ItemsProduct";
import { categoryOptions } from "../../utils/common";
import ModalFilterProduct from "../../components/modal/ModalFilterProduct";
import Paginations from "../../components/pagination/Paginations";
import { useSearchParams } from "react-router-dom";

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const [tempFilters, setTempFilters] = useState({
    page: searchParams.get("page") || "1",
    perPage: searchParams.get("perPage") || "8",
    name: searchParams.get("name") || "",
    category: searchParams.getAll("category") || [],
    min_price: searchParams.get("min_price") || "",
    max_price: searchParams.get("max_price") || "",
    sortBy: searchParams.get("sortBy") || "",
  });

  const applyFilters = () => {
    const params = {};

    Object.entries(tempFilters).forEach(([key, value]) => {
      if (!value || (Array.isArray(value) && value.length === 0)) return;

      if (Array.isArray(value)) {
        params[key] = value;
      } else {
        params[key] = value;
      }
    });

    setSearchParams(params);
  };

  useEffect(() => {
    const urlFilters = Object.fromEntries([...searchParams]);
    urlFilters.category = searchParams.getAll("category");
    setFilters(urlFilters);
  }, [searchParams]);

  // === UPDATE FILTER ===
  const updateTempFilter = (key, value) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  // === UPDATE CATEGORY ===
  const handleCategoryChange = (categoryId, checked) => {
    setTempFilters((prev) => {
      const updated = checked
        ? [...prev.category, categoryId]
        : prev.category.filter((c) => c !== categoryId);

      return { ...prev, category: updated };
    });
  };

  // === RESET FILTER ===
  const resetFilters = () => {
    setTempFilters({
      name: "",
      category: [],
      min_price: "",
      max_price: "",
      sortBy: "",
    });
  };

  const handlePageChange = (page) => {
    setTempFilters((prev) => {
      const updated = { ...prev, page: String(page) }; // update tempFilters
      setSearchParams(updated); // langsung apply ke URL
      return updated;
    });
    setCurrentPage(page);
  };

  return (
    <>
      <header className="mt-30 mx-5 md:my-18 md:mx-0 flex flex-col gap-5">
        <div className="hidden md:block relative w-full">
          <img
            src="/bg-product.svg"
            alt="background"
            className="brightness-70 w-full"
          />
          <h1 className="absolute top-1/2 left-10 lg:left-30 -translate-y-1/2 text-white z-2 text-2xl lg:text-4xl max-w-xl">
            We Provide Good Coffee and Healthy Meals
          </h1>
        </div>

        {/* --- MOBILE SEARCH --- */}
        <div className="flex items-center gap-3 md:px-25 lg:hidden">
          <div className="relative w-full">
            <Search className="absolute top-3 left-2" />
            <input
              type="text"
              placeholder="Find Product"
              className="border border-gray-400 bg-gray-200 rounded-lg py-3 w-full pl-10"
              value={tempFilters.name}
              onChange={(e) => updateTempFilter("name", e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="bg-[#997950] text-white p-3 rounded-xl hover:bg-[#997950] shadow-md active:scale-95"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-10xl px-4 md:px-8 lg:px-30 mb-20">
        <div className="lg:grid lg:grid-cols-12 gap-10 lg:items-start">
          {/* --- Sidebar Filter --- */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-8 w-full">
              <h2 className="text-2xl font-bold mb-6">
                Our <span className="text-[#997950]">Products</span>
              </h2>
              {/* --- FORM FILTER --- */}
              <form>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 shadow-xl">
                  <div className="space-y-6">
                    {/* ---- Filter Header --- */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                      <p className="font-semibold text-lg">Filters</p>
                      <button
                        onClick={resetFilters}
                        className="cursor-pointer text-sm font-medium"
                      >
                        Reset All
                      </button>
                    </div>

                    {/* --- Search name --- */}
                    <div>
                      <label
                        htmlFor="search"
                        className="block text-sm font-medium mb-2"
                      >
                        Search
                      </label>
                      <div className="relative">
                        <Search className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          id="search"
                          placeholder="Search product..."
                          value={tempFilters.name}
                          onChange={(e) =>
                            updateTempFilter("name", e.target.value)
                          }
                          className="bg-white py-2.5 w-full pl-10 pr-3 text-black rounded-lg focus:ring-2 focus:ring-[#997950] focus:outline-none "
                        />
                      </div>
                    </div>

                    {/* --- Category Section- -- */}
                    <div>
                      <p className="font-semibold mb-3 text-sm uppercase">
                        Category
                      </p>
                      <div className="space-y-3">
                        {categoryOptions.map((c) => (
                          <label
                            key={c.id}
                            htmlFor={`category-${c.id}`}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              id={`category-${c.id}`}
                              checked={tempFilters.category.includes(c.value)}
                              onChange={(e) =>
                                handleCategoryChange(c.value, e.target.checked)
                              }
                              className="w-4 h-4 rounded border-gray-300 text-[#997950] focus:ring-[#997950] focus:ring-2 cursor-pointer accent-[#997950]"
                            />
                            <span className="group-hover:text-[#997950]">
                              {c.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* --- Sort By Section --- */}
                    <div>
                      <p className="font-semibold mb-3 text-sm uppercase tracking-wide">
                        Sort By
                      </p>
                      <div className="space-y-3">
                        <label
                          htmlFor="name"
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            id="name"
                            name="sort"
                            value="name"
                            checked={tempFilters.sortBy === "name"}
                            onChange={(e) =>
                              updateTempFilter("sortBy", e.target.value)
                            }
                            className="w-4 h-4 text-[#997950] focus:ring-[#997950] focus:ring-2 cursor-pointer accent-[#997950]"
                          />
                          <span className="group-hover:text-[#997950]">
                            Name
                          </span>
                        </label>

                        <label
                          htmlFor="priceOriginal"
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            id="priceOriginal"
                            name="sort"
                            value="priceOriginal"
                            checked={tempFilters.sortBy === "priceOriginal"}
                            onChange={(e) =>
                              updateTempFilter("sortBy", e.target.value)
                            }
                            className="w-4 h-4 text-[#997950] focus:ring-[#997950] focus:ring-2 cursor-pointer accent-[#997950]"
                          />
                          <span className="group-hover:text-[#997950]">
                            Price
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* --- Price Range --- */}
                    <div>
                      <label
                        htmlFor="pricerange"
                        className="font-semibold mb-3 text-sm uppercase tracking-wide"
                      >
                        Price Range
                      </label>
                      <input
                        type="range"
                        min="0"
                        id="pricerange"
                        max="150000"
                        step="5000"
                        value={tempFilters.min_price || 0}
                        onChange={(e) =>
                          updateTempFilter("min_price", e.target.value)
                        }
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#997950]"
                      />
                      <div className="mt-3 bg-gray-700/50 rounded-lg px-3 py-2">
                        <span className="text-[#997950] font-semibold">
                          IDR{" "}
                          {Number(tempFilters.min_price || 0).toLocaleString(
                            "id-ID"
                          )}
                        </span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        applyFilters();
                      }}
                      className="bg-[#997950] text-white w-full py-2 rounded-lg mt-5 hover:bg-[#876943] transition"
                    >
                      Apply Filter
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/*  --- Products --- */}
          <div className="md:col-span-6 lg:col-span-8 mt-8 lg:mt-0">
            <ItemsProduct filters={filters} setTotalPages={setTotalPages} />
          </div>
        </div>
      </div>

      {/* --- Pagination --- */}
      <div className="mb-16">
        <Paginations
          totalPages={totalPages}
          currentPage={currentPage}
          onChange={handlePageChange}
          siblingCount={1}
          boundaryCount={0}
          color="#997950"
        />
      </div>

      {/* --- MOBILE FILTER MODAL --- */}
      {showMobileFilter && (
        <ModalFilterProduct
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          handleCategoryChange={handleCategoryChange}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
          onClose={() => setShowMobileFilter(false)}
          categoryOptions={categoryOptions}
        />
      )}
    </>
  );
}

export default Product;
