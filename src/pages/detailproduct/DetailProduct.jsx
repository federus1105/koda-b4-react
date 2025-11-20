import React, { useEffect, useState } from "react";
import {
  ThumbsUp,
  Minus,
  Plus,
  ShoppingCart,
  MoveRight,
  Import,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSize, setVariant, setPieces } from "../../redux/slice/orderSlice";
import { getProductById } from "../../services/productService";
import FavoriteProduct from "../../components/cardproduct/FavoriteProduct";

function DetailProduct({ min = 0, max = 10, onChange }) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(min);
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);

  const handleDecrease = () => {
    if (quantity > min) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      dispatch(setPieces(newQty));
      onChange?.(newQty);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      dispatch(setPieces(newQty));
      onChange?.(newQty);
    }
  };
  // --- GET PRODUCT BY ID ---
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id, token);
        console.log(data.result);

        //--- MAPPING DATA ---
        const productData = {
          name: data.result.name,
          description: data.result.desc,
          images: data.result.images,
          price_original: data.result.price,
          price_discount: data.result.priceDiscount,
          rating: data.result.rating,
          sizes: data.result.sizes,
          variants: data.result.variant,
          stock: data.result.stock,
        };

        setProduct(productData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id, token]);

  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <header className="my-20 mx-5 lg:flex lg:mx-30 lg:mt-40 lg:items-center">
        {/* --- Images --- */}
        <div className="lg:w-1/2 flex flex-col md:items-center">
          {/* Gambar utama */}
          <div className="w-full max-w-md">
            <img
              src={
                product.images[0] ||
                "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
              }
              alt={product.name}
              className="mx-auto aspect-square w-full object-cover"
            />
          </div>

          {/* Gambar thumbnail / list */}
          <div className="flex my-4 w-full md:justify-center">
            <div className="flex gap-3 w-full max-w-md">
              <img
                src={
                  product.images[1] ||
                  "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
                }
                alt={product.name}
                className="w-1/3 h-1/2 object-cover"
              />
              <img
                src={
                  product.images[2] ||
                  "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
                }
                alt={product.name}
                className="w-1/3 h-1/2 object-cover"
              />
              <img
                src={
                  product.images[3] ||
                  "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
                }
                alt={product.name}
                className="w-1/3 h-1/2 object-cover"
              />
            </div>
          </div>
        </div>

        {/* --- Description  --- */}
        <div className="lg:w-1/2 md:mx-10 lg:mx-0 ">
          {/* {product.flash_sale && (
            <button className="bg-red-700 text-white rounded-4xl py-2 px-5">
              FLASH SALE
            </button>
          )} */}
          <div className="flex flex-col gap-5 mt-5">
            <h1 className="text-xl font-medium lg:text-3xl">
              {" "}
              {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
            </h1>
            <div className="flex gap-2">
              {product.price_discount > 0 && (
                <span className="line-through text-red-700">
                  IDR {product.price_original.toLocaleString("id-ID")}
                </span>
              )}

              <h1 className="text-orange-500 text-xl">
                IDR{" "}
                {(product.price_discount > 0
                  ? product.price_discount
                  : product.price_original
                ).toLocaleString("id-ID")}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <p>Rating : {product.rating}</p>
            </div>
            <div className="flex gap-5 text-gray-500 text-xl">
              <p>200+ Review</p>
              <p>|</p>
              <p>Recomendation</p>
              <ThumbsUp />
            </div>
            <div>
              <p className="text-gray-500 text-xl">{product.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 border"
                disabled={quantity === min}
              >
                <Minus size={15} />
              </button>

              <span className="px-4 py-2 font-medium">{quantity}</span>

              <button
                onClick={handleIncrease}
                className="p-2 rounded bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
                disabled={quantity === max}
              >
                <Plus size={15} />
              </button>
            </div>
            {/* Size */}
            <div className="flex flex-col gap-3">
              <h1 className="font-medium">Choose Size</h1>
              <div className="flex justify-between gap-10">
                {product.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => {
                      setSelectedSize(size.name);
                      dispatch(setSize(size.name));
                    }}
                    className={`border w-full py-2 px-4 cursor-pointer ${
                      selectedSize === size.name
                        ? "border-orange-500 text-orange-500 font-bold"
                        : "border-gray-300"
                    }`}
                  >
                    {size.name.charAt(0).toUpperCase() + size.name.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* --- Variant  --- */}
            <div className="flex flex-col gap-3">
              <h1 className="font-medium">Hot/Ice?</h1>
              <div className="flex justify-between lg:gap-10">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => {
                      setSelectedVariant(variant.name);
                      dispatch(setVariant(variant.name));
                    }}
                    className={`border py-2 px-20 lg:w-full cursor-pointer ${
                      selectedVariant === variant.name
                        ? "border-orange-500 text-orange-500 font-bold"
                        : "border-gray-300"
                    }`}
                  >
                    {variant.name.charAt(0).toUpperCase() +
                      variant.name.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 flex-col md:flex-row lg:mt-10">
              <Link
                to={"/checkout"}
                className="bg-orange-400 w-full py-4 rounded-md cursor-pointer text-center"
              >
                Buy
              </Link>
              <button className="flex border border-orange-400 text-orange-500 w-full justify-center py-4 gap-2 rounded-md cursor-pointer">
                <ShoppingCart />
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="mx-5 flex flex-col gap-5">
        <h1 className="text-center text-2xl font-medium">
          Recommendation <span className="text-[#8E6447]">For You</span>
        </h1>
        <FavoriteProduct />
        <div className="mb-10">
          <div className="flex items-center justify-center gap-2 mt-10">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className="w-10 h-10 rounded-full bg-gray-200 text-gray-400 active:bg-orange-400"
              >
                {num}
              </button>
            ))}
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-orange-400">
              <MoveRight className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
