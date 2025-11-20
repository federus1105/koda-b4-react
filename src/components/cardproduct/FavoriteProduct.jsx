import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { favoriteProduct } from "../../services/productService";
import { toast } from "react-toastify";
import { ShoppingCart } from "lucide-react";

function FavoriteProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // --- GET PRODUCT FAVORITE ---
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const result = await favoriteProduct();
        setProducts(result.data);
      } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan!, Silahkan coba lagi.");
      }
    };

    fetchProvinces();
  }, []);

  const handleSelectProduct = (productId) => {
    navigate(`/detailproduct/${productId}`);
  };

  const displayProducts = products.length > 0 ? products : Array(4).fill(null);

  return (
    <section className="flex flex-wrap gap-6 md:justify-center">
      {displayProducts.map((product, index) => (
        <div
          key={index}
          className="w-[151px] lg:w-[280px] p-4 flex flex-col gap-3 border rounded-md"
        >
          {/* === IMAGE === */}
          <div
            className="relative cursor-pointer"
            onClick={() => product && handleSelectProduct(product.id)}
          >
            {product ? (
              <>
                <img
                  src={
                    product.image ||
                    "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
                  }
                  alt={product.name}
                  className="rounded-md aspect-square w-full object-cover"
                />
                {product.flash_sale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    FLASH SALE!
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-md bg-gray-200 w-full aspect-square animate-pulse"></div>
            )}
          </div>

          {/* === CONTENT === */}
          <div className="min-h-[160px] flex flex-col justify-between h-full">
            {product ? (
              <>
                {/* === TITLE & DESCRIPTION === */}
                <div>
                  <h2
                    onClick={() => handleSelectProduct(product.id)}
                    className="text-lg font-semibold cursor-pointer"
                  >
                    {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                  </h2>
                  <p className="text-sm text-gray-600 leading-snug line-clamp-2">
                    {product.description}
                  </p>

                  {/* === PRICE & RATING === */}
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <img key={idx} src="/star.svg" alt="Star" />
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
              </>
            ) : (
              // --- Placeholder content ----
              <div className="flex flex-col gap-2 mt-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-full mt-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}


export default FavoriteProduct;
