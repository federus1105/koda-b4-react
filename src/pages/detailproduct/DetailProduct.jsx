import React, { useEffect, useState } from "react";
import {
  ThumbsUp,
  Minus,
  Plus,
  ShoppingCart,
  MoveRight,
  Loader2,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPieces } from "../../redux/slice/orderSlice";
import { getProductById } from "../../services/productService";
import FavoriteProduct from "../../components/cardproduct/FavoriteProduct";
import OptionButton from "../../components/optionButton/OptionButton";
import { createCart } from "../../services/orderService";
import { toast } from "react-toastify";
import { delay } from "../../utils/common";

function DetailProduct({ min = 0, max = 10, onChange }) {
  const [isLoadingAddCart, setIsLoadingAddCart] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(min);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // --- HANDLE QUANTITY ---
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
      setIsLoading(true);
      try {
        const data = await getProductById(id, token);
        console.log(data);

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
          flash_sale: data.result.flash_sale,
        };

        await delay(500);
        setProduct(productData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, token]);

  // --- ADD TO CARTS ---
  const handleAddToCart = async (shouldNavigate = false) => {
    if (quantity < 1) {
      toast.error("Quantity harus diisi");
      return;
    }
    setIsLoadingAddCart(true);
    try {
      const payload = {
        product_id: Number(id),
        size: selectedSize?.id,
        variant: selectedVariant?.id,
        quantity: quantity,
        token,
      };

      await Promise.all([createCart(payload), delay(800)]);

      toast.success("Product di tambahkan ke cart");
      if (shouldNavigate) {
        navigate("/checkout");
      }
    } catch (error) {
      toast.error(error);
      toast.error("Terjadi Kesalahan! silahkan coba lagi");
    } finally {
      setIsLoadingAddCart(false);
    }
  };

  if (isLoading || isLoadingAddCart) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-16 h-16 animate-spin text-[#997950]" />
      </div>
    );
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
          {product.flash_sale && (
            <button className="bg-red-700 text-white rounded-4xl py-2 px-5">
              FLASH SALE
            </button>
          )}

          <div className="flex flex-col gap-5 mt-5">
            <h1 className="text-xl font-medium lg:text-3xl">
              {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
            </h1>
            <div className="flex gap-2">
              {product.price_discount > 0 && (
                <span className="line-through text-gray-400">
                  IDR {product.price_original.toLocaleString("id-ID")}
                </span>
              )}

              <h1 className="text-brand font-medium text-xl">
                IDR{" "}
                {(product.price_discount > 0
                  ? product.price_discount
                  : product.price_original
                ).toLocaleString("id-ID")}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-yellow-600 font-medium">
                ⭐{(Number(product.rating) || 0).toFixed(1)}
              </p>
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
            <p className="font-medium">
              Stock {""}: {product.stock}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className="cursor-pointer p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 border"
                disabled={quantity === min}
              >
                <Minus size={15} />
              </button>

              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="cursor-pointer p-2 rounded bg-brand text-white hover:bg-brand disabled:opacity-50"
                disabled={quantity === max}
              >
                <Plus size={15} />
              </button>
            </div>

            {/* ---- Size --- */}
            <OptionButton
              title="Choose Size"
              options={product.sizes}
              selected={selectedSize}
              onSelect={(size) => {
                setSelectedSize(size);
              }}
              emptyText="Tidak ada Pilihan"
            />

            {/*---  Variant --- */}
            <OptionButton
              title="Hot/Ice?"
              options={product.variants}
              selected={selectedVariant}
              onSelect={(variant) => {
                setSelectedVariant(variant);
              }}
              emptyText="Tidak ada pilihan"
            />

            <div className="flex gap-4 flex-col md:flex-row lg:mt-10">
              <Link
                className="bg-brand w-full py-4 rounded-md cursor-pointer text-center"
                onClick={() => handleAddToCart(true)}
              >
                Buy
              </Link>
              <button
                className="flex border-brand text-brand w-full justify-center py-4 gap-2 rounded-md cursor-pointer"
                onClick={() => handleAddToCart(false)}
              >
                <ShoppingCart />
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="mx-5 flex flex-col gap-5">
        <h1 className="text-center text-2xl font-medium">
          Recommendation <span className="text-brand">For You</span>
        </h1>
        <FavoriteProduct />
        <div className="mb-10">
          <div className="flex items-center justify-center gap-2 mt-10">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className="w-10 h-10 rounded-full bg-gray-200 text-gray-400 active:bg-brand"
              >
                {num}
              </button>
            ))}
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-brand">
              <MoveRight className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
