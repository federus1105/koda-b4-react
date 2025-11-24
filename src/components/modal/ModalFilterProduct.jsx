import { X } from "lucide-react";
import React from "react";

function ModalFilterProduct({
  tempFilters,
  setTempFilters,
  handleCategoryChange,
  resetFilters,
  applyFilters,
  onClose,
  categoryOptions,
}) {
  const updateTempFilter = (key, value) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white hover:text-[[#997950]] absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#997950]">Filters</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Category Mobile */}
              <div>
                <h4 className="font-semibold mb-3">Category</h4>
                <div className="space-y-3">
                  {categoryOptions.map((c) => (
                    <label
                      key={c.id}
                      htmlFor={`mobile-category-${c.id}`}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id={`category-${c.id}`}
                        checked={tempFilters.category.includes(c.value)}
                        onChange={(e) =>
                          handleCategoryChange(c.value, e.target.checked)
                        }
                        className="w-4 h-4 rounded border-gray-300 text-[#997950] focus:ring-[#997950] accent-[#997950]"
                      />
                      <span>{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By Mobile */}
              <div>
                <h4 className="font-semibold mb-3">Sort By</h4>
                <div className="space-y-3">
                  <label
                    htmlFor="mobile-name"
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      id="mobile-name"
                      name="mobile-sort"
                      value="name"
                      checked={tempFilters.sortBy === "name"}
                      onChange={(e) =>
                        updateTempFilter("sortBy", e.target.value)
                      }
                      className="w-4 h-4 text-[#997950] accent-[#997950]"
                    />
                    <span>Name</span>
                  </label>

                  <label
                    htmlFor="mobile-price"
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      id="mobile-price"
                      name="mobile-sort"
                      value="priceOriginal"
                      checked={tempFilters.sortBy === "priceOriginal"}
                      onChange={(e) =>
                        updateTempFilter("sortBy", e.target.value)
                      }
                      className="w-4 h-4 text-[#997950] accent-[#997950]"
                    />
                    <span>Price</span>
                  </label>
                </div>
              </div>

              {/* Price Range Mobile */}
              <div>
                <h4 className="font-semibold mb-3">Price Range</h4>
                <input
                  type="range"
                  min="0"
                  max="150000"
                  step="5000"
                  value={tempFilters.min_price || 0}
                  onChange={(e) =>
                    updateTempFilter("min_price", e.target.value)
                  }
                  className="w-full accent-[#997950]"
                />
                <div className="mt-2 text-[#997950] font-semibold">
                  IDR{" "}
                  {Number(tempFilters.min_price || 0).toLocaleString("id-ID")}
                </div>
              </div>

              <button
                onClick={() => {
                  resetFilters();
                  applyFilters();
                  onClose();
                }}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium"
              >
                Reset Filters
              </button>
              <button
                onClick={() => {
                  applyFilters();
                  onClose();
                }}
                className="w-full bg-[#997950] text-white py-3 rounded-lg font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalFilterProduct;
