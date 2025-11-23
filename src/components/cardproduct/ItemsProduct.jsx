import React, { useEffect, useState } from "react";
import { Loader2, PackageX, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { productList } from "../../services/productService";
import { delay } from "../../utils/common";

function ItemsProduct({ filters, setTotalPages }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchproducts = async () => {
      setIsLoading(true);
      await delay(500);
      try {
        const res = await productList(filters);
        setProducts(res.data);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchproducts();
  }, [filters]);

  // === SELECT PRODUCT ===
  const handleSelectProduct = (productId) => {
    navigate(`/detailproduct/${productId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-[#997950]" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <PackageX className="w-20 h-20 text-gray-400 mb-4" />
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          Product Not Found
        </h3>
        <p className="text-gray-500 max-w-md">
          We couldn't find any products matching your filters. Try adjusting
          your search criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="flex flex-wrap gap-6 justify-center">
        {products.slice(0, 8).map((product, index) => (
          <div
            key={index}
            className="w-[165px] lg:w-[250px] p-4 flex flex-col gap-3 border-2 border-[#997950] rounded-lg"
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
                  <p className="text-[#997950] font-semibold text-base">
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
                  className="bg-[#997950] text-white font-medium py-1.5 rounded-md cursor-pointer"
                >
                  Buy
                </button>
                <button className="border border-[#997950] text-[#997950] py-1.5 rounded-md cursor-pointer flex justify-center">
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

export default ItemsProduct;
