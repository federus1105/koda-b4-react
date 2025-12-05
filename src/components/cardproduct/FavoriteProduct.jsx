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
    const fetchFavorite = async () => {
      try {
        const result = await favoriteProduct();
        setProducts(result.data);
      } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan!, Silahkan coba lagi.");
      }
    };

    fetchFavorite();
  }, []);

  const handleSelectProduct = (productId) => {
    navigate(`/detailproduct/${productId}`);
  };

  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div
          key={index}
          className="p-4 flex flex-col gap-3 border border-gray-600 rounded-md"
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
                    className="text-white text-lg font-semibold cursor-pointer"
                  >
                    {product.name.charAt(0).toUpperCase() +
                      product.name.slice(1)}
                  </h2>
                  <p className="text-sm text-white leading-snug line-clamp-2">
                    {product.description}
                  </p>

                  {/* === PRICE & RATING === */}
                  <div className="flex gap-2 pt-4">
                    {product.discount > 0 && (
                      <span className="line-through text-gray-400">
                        IDR {product.price.toLocaleString("id-ID")}
                      </span>
                    )}

                    <h1 className="text-brand font-bold">
                      IDR{" "}
                      {(product.discount > 0
                        ? product.discount
                        : product.price
                      ).toLocaleString("id-ID")}
                    </h1>
                  </div>
                </div>

                {/* === BUTTONS === */}
                <div className="flex flex-col gap-2 mt-4">
                  <button
                    onClick={() => handleSelectProduct(product.id)}
                    className="bg-brand text-white font-medium py-1.5 rounded-md cursor-pointer"
                  >
                    Buy
                  </button>
                  <button
                    className="cursor-pointer border border-gray-500 text-brand py-1.5 rounded-md cursor-pointer flex justify-center"
                    onClick={() => handleSelectProduct(product.id)}
                  >
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
