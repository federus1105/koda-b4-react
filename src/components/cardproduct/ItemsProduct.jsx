import React, { useEffect, useState } from "react";
import { Loader2, PackageX, ShoppingCart } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { productList } from "../../services/productService";
import { delay } from "../../utils/common";

function ItemsProduct({ filters, setTotalPages }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
    const { setLoading } = useOutletContext();

  useEffect(() => {
    const fetchproducts = async () => {
      setLoading(true);
      await delay(800);
      try {
        const res = await productList(filters);
        setProducts(res.data);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchproducts();
  }, [filters, setTotalPages, setLoading]);

  // === SELECT PRODUCT ===
  const handleSelectProduct = (productId) => {
    navigate(`/detailproduct/${productId}`);
  };

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
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="w-full p-4 flex flex-col gap-3 border-brand rounded-lg"
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
                    {/* ⭐{(Number(product.rating) || 0).toFixed(1)} */}
                  </div>
                  <div className="flex gap-2">
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
              </div>

              {/* === BUTTONS === */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => handleSelectProduct(product.id)}
                  className="bg-brand text-white font-medium py-1.5 rounded-md cursor-pointer"
                >
                  Buy
                </button>
                <button className="border-brand text-brand py-1.5 rounded-md cursor-pointer flex justify-center">
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
