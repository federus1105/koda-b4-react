import { ImagesIcon, Loader2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  AdminCreateProduct,
  AdminGetCategory,
} from "../../services/productService";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import {
  delay,
  formatCategoryName,
  imageKeys,
  sizeMap,
  sizes,
} from "../../utils/common";

function ModalCreate({ onClose }) {
  const [categories, setCategories] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [selectedImagesPreview, setSelectedImagesPreview] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [selectedImageFiles, setSelectedImageFiles] = useState([
    null,
    null,
    null,
    null,
  ]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // --- GET CATEGORY ---
  useEffect(() => {
    const getCategory = async () => {
      try {
        const result = await AdminGetCategory(token);
        setCategories(result.data);
      } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan!, Silahkan coba lagi.");
      }
    };
    getCategory();
  }, [token]);

  // --- HANDLE IMAGES ---
  const handleImageClick = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newPreviews = [...selectedImagesPreview];
          newPreviews[index] = event.target.result;
          setSelectedImagesPreview(newPreviews);

          const newFiles = [...selectedImageFiles];
          newFiles[index] = file;
          setSelectedImageFiles(newFiles);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // --- HANDLE SUBMIT ----
  const onSubmit = async (data) => {
    try {
      setIsLoadingCreate(true);
      await delay(800);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("stock", data.stock);
      formData.append("rating", data.rating);
      if (data.category && data.category.length > 0) {
        data.category.forEach((catId) => {
          formData.append("category", catId);
        });
      }
      if (data.size && data.size.length > 0) {
        data.size.forEach((size) => {
          const sizeId = sizeMap[size];
          formData.append("size", sizeId);
        });
      }

      if (data.variant && data.variant.length > 0) {
        data.variant.forEach((variantId) => {
          formData.append("variant", variantId);
        });
      }
      selectedImageFiles.forEach((file, idx) => {
        if (file instanceof File) {
          formData.append(imageKeys[idx], file);
        }
      });

      const res = await AdminCreateProduct(formData, token);
      toast.success("Product berhasil dibuat!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Gagal membuat product, silahkan coba lagi.");
    } finally {
      setIsLoadingCreate(false);
    }
  };

  if (isLoadingCreate) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
        <Loader2 className="w-12 h-12 animate-spin text-[#997950]" />
      </div>
    );
  }

  return (
    <>
      <section className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-medium text-lg">Add Product</h1>
            <button type="button" aria-label="Close" onClick={onClose}>
              <X className="text-red-500 w-6 h-6 cursor-pointer hover:text-red-600" />
            </button>
          </div>

          {/* === Form === */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* --- Photo Product --- */}
            <div>
              <label
                htmlFor="photo-product"
                className="block text-sm font-medium mb-3"
              >
                Photo Product
              </label>
              <div className="grid grid-cols-4 gap-4">
                {selectedImagesPreview.map((image, i) => (
                  <div
                    key={imageKeys[i]}
                    onClick={() => handleImageClick(i)}
                    className="w-full aspect-square rounded-md bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 overflow-hidden"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={`Upload ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImagesIcon className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/*---  Product Name --- */}
            <div>
              <label
                htmlFor="product-name"
                className="block text-sm font-medium mb-3"
              >
                Product name
              </label>
              <input
                id="product-name"
                type="text"
                placeholder="Enter Product Name"
                {...register("name", { required: "Product name is required" })}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus-brand ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/*---  Product Category--- */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Category
              </label>

              <Controller
                name="category"
                control={control}
                defaultValue={[]}
                rules={{
                  validate: (value) =>
                    value.length > 0 || "Pilih minimal satu category",
                }}
                render={({ field }) => {
                  const { value, onChange } = field;

                  const handleCategoryChange = (catId) => {
                    if (value.includes(catId)) {
                      onChange(value.filter((id) => id !== catId));
                    } else {
                      onChange([...value, catId]);
                    }
                  };

                  return (
                    <div className="max-h-48 overflow-y-auto p-4 border border-gray-200 rounded-xl shadow-sm bg-white space-y-2">
                      {categories.map((cat) => (
                        <label
                          key={cat.id}
                          className="flex items-center p-3 rounded-lg cursor-pointer border border-gray-100 hover:bg-gray-50 hover:shadow-sm"
                        >
                          <input
                            type="checkbox"
                            checked={value.includes(cat.id)}
                            onChange={() => handleCategoryChange(cat.id)}
                            className="w-5 h-5 accent-[#997950] cursor-pointer"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-700">
                            {formatCategoryName(cat.name)}
                          </span>
                        </label>
                      ))}
                    </div>
                  );
                }}
              />

              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/*---  Price --- */}
            <div>
              <label
                htmlFor="product-price"
                className="block text-sm font-medium mb-3"
              >
                Price
              </label>
              <input
                id="product-price"
                type="number"
                placeholder="Enter Product Price"
                {...register("price", { required: "Price is required" })}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus-brand ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/*---  Description --- */}
            <div>
              <label
                htmlFor="product-description"
                className="block text-sm font-medium mb-3"
              >
                Description
              </label>
              <textarea
                id="product-description"
                placeholder="Enter Product Description"
                {...register("description", {
                  required: "Description is required",
                })}
                className={`w-full border rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus-brand ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/*---  Product Size --- */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Product Size
              </label>
              <Controller
                name="size"
                control={control}
                defaultValue={[]}
                render={({ field }) => {
                  const { value, onChange } = field;

                  const handleCheckboxChange = (size) => {
                    if (value.includes(size)) {
                      onChange(value.filter((s) => s !== size));
                    } else {
                      onChange([...value, size]);
                    }
                  };

                  return (
                    <div className="flex gap-2">
                      {sizes.map((size) => (
                        <label
                          key={size}
                          className="flex-1 cursor-pointer select-none"
                        >
                          <input
                            type="checkbox"
                            value={size}
                            checked={value.includes(size)}
                            onChange={() => handleCheckboxChange(size)}
                            className="hidden"
                          />
                          <div
                            className={`border rounded-md py-2 px-3 text-sm text-center ${
                              value.includes(size)
                                ? "border-brand bg-brand text-white"
                                : "border-gray-300 hover:border-[#997950] hover:bg-[#997950] hover:text-white"
                            }`}
                          >
                            {size}
                          </div>
                        </label>
                      ))}
                    </div>
                  );
                }}
              />
            </div>

            {/*---  Product Variant--- */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Product Variant
              </label>
              <Controller
                name="variant"
                control={control}
                defaultValue={[]}
                render={({ field }) => {
                  const { value, onChange } = field;

                  const handleVariantChange = (variantId) => {
                    if (value.includes(variantId)) {
                      onChange(value.filter((id) => id !== variantId));
                    } else {
                      onChange([...value, variantId]);
                    }
                  };

                  return (
                    <div className="flex gap-2">
                      <label className="flex-1 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={value.includes("1")}
                          onChange={() => handleVariantChange("1")}
                          className="hidden"
                        />
                        <div
                          className={`border rounded-md py-2 px-3 text-sm text-center ${
                            value.includes("1")
                              ? "border-brand bg-brand text-white"
                              : "border-gray-300 hover:border-[#997950] hover:bg-[#997950] hover:text-white"
                          }`}
                        >
                          Hot
                        </div>
                      </label>

                      <label className="flex-1 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={value.includes("2")}
                          onChange={() => handleVariantChange("2")}
                          className="hidden"
                        />
                        <div
                          className={`border rounded-md py-2 px-3 text-sm text-center ${
                            value.includes("2")
                              ? "border-brand bg-brand text-white"
                              : "border-gray-300 hover:border-[#997950] hover:bg-[#997950] hover:text-white"
                          }`}
                        >
                          Ice
                        </div>
                      </label>
                    </div>
                  );
                }}
              />
              {errors.variant && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.variant.message}
                </p>
              )}
            </div>

            {/* ---  Stock --- */}
            <div>
              <label
                htmlFor="product-stock"
                className="block text-sm font-medium mb-3"
              >
                Stock
              </label>
              <input
                id="product-stock"
                type="number"
                placeholder="Enter Product Stock"
                {...register("stock", { required: "Stock is required" })}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus-brand ${
                  errors.stock ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>

            {/*---  Rating --- */}
            <div>
              <label
                htmlFor="product-rating"
                className="block text-sm font-medium mb-3"
              >
                Rating
              </label>
              <input
                id="product-rating"
                type="number"
                placeholder="Enter Product Rating"
                {...register("rating", {
                  required: "Rating is required",
                  min: 0,
                  max: 10,
                })}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus-brand ${
                  errors.rating ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rating.type === "min" || errors.rating.type === "max"
                    ? "Rating must be between 0 and 10"
                    : errors.rating.message}
                </p>
              )}
            </div>

            {/* --- Submit Button --- */}
            <button
              type="submit"
              className="cursor-pointer w-full bg-brand text-white rounded-md py-2 font-semibold hover:bg-[#997950]"
            >
              Save Product
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ModalCreate;
