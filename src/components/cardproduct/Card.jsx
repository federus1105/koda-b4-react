import React, { useEffect, useState } from "react";
import { RatIcon, ShoppingCart } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setScelectedProduct } from "../../redux/slice/orderSlice";

function Card() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation("/");
  const currentPage = location.pathname;

  useEffect(() => {
    async function fetchproducts() {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/federus1105/koda-b4-react/refs/heads/development/data.json"
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    }
    fetchproducts();
  }, []);

  // === SELECT PRODUCT ===
  const handleSelectProduct = (product) => {
    const selected = {
      id: product.id,
      name: product.name,
      price_discount: product.price_discount,
      image: product.image,
      price_original: product.price_original,
      rating: product.rating,
      flash_sale: product.flash_sale,
    };
    dispatch(setScelectedProduct(selected));
    navigate(`/detailproduct/${product.id}`);
  };

  // ===  FUNCTION SLICE ===
  const itemsPerPage =
    currentPage === "/" ? 10 : currentPage === "/product" ? 8 : 8;
  const displayedProducts = products.slice(0, itemsPerPage);

  return (
    <>
      <section className="flex flex-wrap gap-6 md:justify-center">
        {displayedProducts.slice(0, 10).map((product) => (
          <div
            key={product.id}
            className="w-[175px] lg:w-[280px] p-4 flex flex-col gap-3 border"
          >
            {/* === IMAGE === */}
            <div
              className="relative cursor-pointer"
              onClick={() => handleSelectProduct(product)}
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
                  onClick={() => handleSelectProduct(product)}
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
                    IDR {product.price_discount.toLocaleString("id-ID")}
                    {product.price_original > product.price_discount && (
                      <span className="line-through text-xs text-gray-500 ml-2">
                        IDR {product.price_original.toLocaleString("id-ID")}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* === BUTTONS === */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => handleSelectProduct(product)}
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

export default Card;
