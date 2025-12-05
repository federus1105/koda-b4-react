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
      const updated = { ...prev, page: String(page) };
      setSearchParams(updated);
      return updated;
    });
    setCurrentPage(page);
  };

  return (
    <>
      <header className="mt-30 mx-5 md:my-18 md:mx-0 flex flex-col gap-5">
        <div className="hidden md:block relative h-[450px] lg:h-[500px] overflow-hidden">
          <img
            src="/background.jpg"
            alt="Coffee Shop Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
              <div className="max-w-2xl">
                <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  We Provide Good Coffee, Foods and Healthy Meals
                </h1>
                <p className="text-white/90 text-lg md:text-xl mb-8">
                  Discover our premium selection
                </p>

                {/* Desktop Search Bar */}
                <div className="relative max-w-xl">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-800"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search for coffee, food, and more..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-white/95 focus-brand focus:outline-none text-stone-800 shadow-xl"
                    value={tempFilters.name}
                    onChange={(e) => updateTempFilter("name", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MOBILE SEARCH --- */}
        <div className="flex items-center gap-3 md:px-25 lg:hidden">
          <div className="relative w-full">
            <Search className="absolute top-3 left-2" />
            <input
              type="text"
              placeholder="Search Product..."
              className="border border-gray-400 bg-gray-200 rounded-lg py-3 w-full pl-10"
              value={tempFilters.name}
              onChange={(e) => updateTempFilter("name", e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="bg-brand text-white p-3 rounded-xl shadow-md active:scale-95"
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
                Our <span className="text-brand">Products</span>
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
                              className="w-4 h-4 rounded border-gray-300 focus:ring-[#997950] focus:ring-2 cursor-pointer accent-[#997950]"
                            />
                            <span>{c.label}</span>
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
                            className="w-4 h-4 focus:ring-[#997950] focus:ring-2 cursor-pointer accent-[#997950]"
                          />
                          <span>Name</span>
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
                            className="w-4 h-4 focus:ring-[#997950] focus:ring-2 cursor-pointer accent-[#997950]"
                          />
                          <span>Price</span>
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
                        <span className="text-brand font-semibold">
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
                      className="cursor-pointer bg-brand text-white w-full py-2 rounded-lg mt-5 hover:bg-brand"
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
