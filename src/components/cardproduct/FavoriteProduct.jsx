import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { favoriteProduct } from "../../services/productService";
import { toast } from "react-toastify";
import { ShoppingCart } from "lucide-react";

function FavoriteProduct() {
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  // --- GET PRODUCT FAVORITE ---
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const result = await favoriteProduct(token);
        setProducts(result.data);
      } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan!, Silahkan coba lagi.");
      }
    };

    if (token) fetchProvinces();
  }, [token]);

  const handleSelectProduct = (productId) => {
    navigate(`/detailproduct/${productId}`);
  };
  return (
    <>
      <section className="flex flex-wrap gap-6 md:justify-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[175px] lg:w-[280px] p-4 flex flex-col gap-3 border"
          >
            {/* === IMAGE === */}
            <div
              className="relative cursor-pointer"
              onClick={() => handleSelectProduct(product.id)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="rounded-md aspect-square w-full object-cover"
              />
              {product.flash_sale && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  FLASH SALE!
                </div>
              )}
            </div>

            {/* === CONTENT === */}
            <div className="min-h-[160px] flex flex-col justify-between h-full">
              {/* === TITLE & DESCRIPTION === */}
              <div>
                <h2
                  onClick={() => handleSelectProduct(product.id)}
                  className="text-lg font-semibold cursor-pointer"
                >
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600 leading-snug line-clamp-2">
                  {product.description}
                </p>

                {/* === PRICE & RATING === */}
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <img key={index} src="/star.svg" alt="Star" />
                    ))}
                    <p>{product.rating}</p>
                  </div>
                  <p className="text-orange-600 font-semibold text-base">
                    IDR {product.price}
                    {product.price_original > product.price_discount && (
                      <span className="line-through text-xs text-gray-500 ml-2">
                        IDR {product.price.toLocaleString("id-ID")}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* === BUTTONS === */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => handleSelectProduct(product.id)}
                  className="bg-orange-500 text-white font-medium py-1.5 rounded-md hover:bg-orange-600 cursor-pointer"
                >
                  Buy
                </button>
                <button className="border border-orange-500 text-orange-500 py-1.5 rounded-md hover:bg-orange-50 cursor-pointer flex justify-center">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default FavoriteProduct;
