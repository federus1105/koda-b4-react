import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  AdminGetCategory,
  AdminUpdateProduct,
} from "../../services/productService";
import { useSelector } from "react-redux";
import { delay, formatCategoryName, imageKeys } from "../../utils/common";
import { ImagesIcon, Loader2, X } from "lucide-react";
const imageKeysResponse = [
  "photos_one",
  "photos_two",
  "photos_three",
  "photos_four",
];
const sizesResponse = ["regular", "medium", "large"];

function ModalUpdate({ onClose, product }) {
  const [categories, setCategories] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const initialPreview = imageKeysResponse.map(
    (key) => product.images?.[key] || null
  );
  const [selectedImagesPreview, setSelectedImagesPreview] =
    useState(initialPreview);
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
  } = useForm({
    defaultValues: {
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      rating: product.rating,
      category: product.category?.map((c) => c.id) || [],
      size: product.size || [],
      variant: product.variant || [],
    },
  });

  // --- GET CATEGORY ---
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await AdminGetCategory(token);
        setCategories(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Terjadi kesalahan!, Silahkan coba lagi.");
      }
    };
    getCategory();
  }, [token]);

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
          newFiles[index] = file; //
          setSelectedImageFiles(newFiles);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // --- HANDLE SUBMIT ---
  const onSubmit = async (data) => {
    try {
      setIsLoadingUpdate(true);
      const formData = new FormData();
      await delay(800);

      // Append only updated fields
      if (data.name !== product.name) formData.append("name", data.name);
      if (data.price !== product.price) formData.append("price", data.price);
      if (data.description !== product.description)
        formData.append("description", data.description);
      if (data.stock !== product.stock) formData.append("stock", data.stock);
      if (data.rating && data.rating !== product?.rating) {
        formData.append("rating", data.rating);
      }

      // CATEGORY
      if (data.category?.length) {
        data.category.forEach((catId) => formData.append("category", catId));
      }

      // SIZE
      const sizeMap = { regular: "1", medium: "2", large: "3" };
      data.size.forEach((s) => {
        const sizeId = sizeMap[s];
        if (sizeId) formData.append("size", sizeId);
      });

      // VARIANT
      const variantMap = { hot: "1", ice: "2" };
      data.variant.forEach((v) => {
        const variantId = variantMap[v];
        if (variantId) formData.append("variant", variantId);
      });

      console.log([...formData.entries()]);

      // --- IMAGES ---
      selectedImageFiles.forEach((file, idx) => {
        if (file instanceof File) formData.append(imageKeys[idx], file);
      });

      await AdminUpdateProduct(product.id, token, formData);
      toast.success("Product berhasil diperbarui!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Gagal update product, silahkan coba lagi.");
    } finally {
      setIsLoadingUpdate(false);
    }
  };
  // --- LOADING EARLY RETURN ---
  if (isLoadingUpdate) {
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
            <h1 className="font-medium text-lg">Edit Product</h1>
            <button type="button" aria-label="Close" onClick={onClose}>
              <X className="text-red-500 w-6 h-6 cursor-pointer hover:text-red-600" />
            </button>
          </div>

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
              <label className="block text-sm font-medium mb-3">
                Product Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Nama product harus diisi" })}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus-brand ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
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
            {/*--- Product Size ---*/}
            <div>
              <label className="block text-sm font-medium mb-3">
                Product Size
              </label>
              <Controller
                name="size"
                control={control}
                render={({ field }) => {
                  const { value, onChange } = field;

                  const handleCheckboxChange = (sizeOption) => {
                    if (value.includes(sizeOption)) {
                      onChange(value.filter((s) => s !== sizeOption));
                    } else {
                      onChange([...value, sizeOption]);
                    }
                  };

                  return (
                    <div className="flex gap-2">
                      {sizesResponse.map((sizeOption) => (
                        <label
                          key={sizeOption}
                          className="cursor-pointer flex-1"
                        >
                          <input
                            type="checkbox"
                            checked={value.includes(sizeOption)}
                            onChange={() => handleCheckboxChange(sizeOption)}
                            className="hidden"
                          />
                          <div
                            className={`border rounded-md py-2 px-3 text-center ${
                              value.includes(sizeOption)
                                ? "border-[#997950] bg-[#997950] text-white"
                                : "border-gray-300"
                            }`}
                          >
                            {sizeOption.charAt(0).toUpperCase() +
                              sizeOption.slice(1).toLowerCase()}
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
                render={({ field }) => {
                  const { value, onChange } = field;

                  const handleVariantChange = (variant) => {
                    if (value.includes(variant)) {
                      onChange(value.filter((v) => v !== variant));
                    } else {
                      onChange([...value, variant]);
                    }
                  };

                  return (
                    <div className="flex gap-2">
                      {/* HOT */}
                      <label className="flex-1 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={value.includes("hot")}
                          onChange={() => handleVariantChange("hot")}
                          className="hidden"
                        />
                        <div
                          className={`border rounded-md py-2 px-3 text-sm text-center ${
                            value.includes("hot")
                              ? "border-brand bg-brand text-white"
                              : "border-gray-300"
                          }`}
                        >
                          Hot
                        </div>
                      </label>

                      {/* ICE */}
                      <label className="flex-1 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={value.includes("ice")}
                          onChange={() => handleVariantChange("ice")}
                          className="hidden"
                        />
                        <div
                          className={`border rounded-md py-2 px-3 text-sm text-center ${
                            value.includes("ice")
                              ? "border-brand bg-brand text-white"
                              : "border-gray-300 hover:text-white"
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
                {...register("stock", {
                  min: 0,
                  required: "Stock is required",
                })}
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
            <input
              id="product-rating"
              type="number"
              placeholder={product?.rating ?? "Enter Product Rating"}
              defaultValue={product?.rating || ""}
              {...register("rating", {
                min: {
                  value: 0,
                  message: "Rating must be between 0 and 10",
                },
                max: {
                  value: 10,
                  message: "Rating must be between 0 and 10",
                },
              })}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus-brand ${
                errors.rating ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}

            <button
              type="submit"
              className="cursor-pointer w-full py-2 bg-brand text-white rounded-md font-semibold"
            >
              Update Product
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ModalUpdate;
