import React, { useEffect, useState } from "react";
import {
  ThumbsUp,
  Minus,
  Plus,
  ShoppingCart,
  Loader2,
  Star,
  Package,
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (isLoading || isLoadingAddCart) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-16 h-16 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-stone-50">
        {/* Product Detail Section */}
        <section className="container mx-auto md:px-8 lg:px-20 pt-28 pb-16">
          <div className="bg-white rounded-3xl border-2 border-stone-200 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Images Gallery */}
              <div className="p-8 lg:p-12 bg-stone-50">
                {/* Flash Sale Badge */}
                {product.flash_sale && (
                  <div className="mb-6 inline-flex items-center gap-2 bg-red-600 text-white rounded-full py-2 px-6 font-bold shadow-lg">
                    FLASH SALE
                  </div>
                )}

                {/* Main Image */}
                <div className="relative mb-6 bg-white rounded-2xl overflow-hidden border-2 border-stone-200">
                  <img
                    src={
                      product.images[activeImageIndex] ||
                      "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
                    }
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                  />
                </div>

                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-3">
                  {product.images.slice(0, 4).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative rounded-xl overflow-hidden border-2 ${
                        activeImageIndex === idx
                          ? "border-brand shadow-lg scale-105"
                          : "border-stone-200 hover:border-brand"
                      }`}
                    >
                      <img
                        src={
                          img ||
                          "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
                        }
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full aspect-square object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side - Product Info */}
              <div className="p-8 lg:p-12 flex flex-col">
                {/* Product Title */}
                <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                  {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                </h1>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b-2 border-stone-100">
                  <div className="flex items-center gap-2">
                    <Star
                      className="fill-yellow-500 text-yellow-500"
                      size={24}
                    />
                    <span className="text-2xl font-bold text-stone-900">
                      {(Number(product.rating) || 0).toFixed(1)}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-stone-300"></div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <span className="font-medium">200+ Reviews</span>
                  </div>
                  <div className="h-6 w-px bg-stone-300"></div>
                  <div className="flex items-center gap-2 text-brand">
                    <ThumbsUp size={20} />
                    <span className="font-medium">Recommended</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold text-brand">
                      IDR{" "}
                      {(product.price_discount > 0
                        ? product.price_discount
                        : product.price_original
                      ).toLocaleString("id-ID")}
                    </span>
                    {product.price_discount > 0 && (
                      <span className="text-xl line-through text-stone-400">
                        IDR {product.price_original.toLocaleString("id-ID")}
                      </span>
                    )}
                  </div>
                  {product.price_discount > 0 && (
                    <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                      Save IDR{" "}
                      {(
                        product.price_original - product.price_discount
                      ).toLocaleString("id-ID")}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-lg text-stone-600 leading-relaxed mb-6 pb-6 border-b-2 border-stone-100">
                  {product.description}
                </p>

                {/* Stock Info */}
                <div className="flex items-center gap-3 mb-6 bg-stone-50 rounded-xl p-4 border-2 border-stone-200">
                  <Package className="text-brand" size={24} />
                  <div>
                    <p className="text-sm text-stone-500 font-medium">
                      Available Stock
                    </p>
                    <p className="text-xl font-bold text-stone-900">
                      {product.stock} units
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <h3 className="font-semibold text-stone-800 mb-3">
                    Quantity
                  </h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleDecrease}
                      className="cursor-pointer w-12 h-12 rounded-xl bg-stone-100 hover:bg-stone-200 border-2 border-stone-200 flex items-center justify-center disabled:opacity-50"
                      disabled={quantity === min}
                    >
                      <Minus size={20} />
                    </button>
                    <span className="text-2xl font-bold text-stone-900 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrease}
                      className="cursor-pointer w-12 h-12 rounded-xl bg-brand text-white flex items-center justify-center disabled:opacity-50 shadow-md"
                      disabled={quantity === max}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                {/* Size Options */}
                <div className="mb-6">
                  <OptionButton
                    title="Choose Size"
                    options={product.sizes}
                    selected={selectedSize}
                    onSelect={(size) => setSelectedSize(size)}
                    emptyText="No size options available"
                  />
                </div>

                {/* Variant Options */}
                <div className="mb-8">
                  <OptionButton
                    title="Hot or Ice?"
                    options={product.variants}
                    selected={selectedVariant}
                    onSelect={(variant) => setSelectedVariant(variant)}
                    emptyText="No variant options available"
                  />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                  <button
                    onClick={() => handleAddToCart(true)}
                    className="cursor-pointer bg-brand hover:bg-brand text-white py-4 rounded-xl font-bold text-lg"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => handleAddToCart(false)}
                    className="cursor-pointer flex items-center justify-center gap-3 border-2 border-brand text-brand py-4 rounded-xl font-bold text-lg"
                  >
                    <ShoppingCart size={24} />
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="container mx-auto px-4 md:px-8 lg:px-20 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-3">
              Recommendations <span className="text-brand">For You</span>
            </h2>
            <p className="text-stone-600 text-lg">
              Discover similar products you might love
            </p>
          </div>
          <FavoriteProduct />

        </section>
      </div>
    </>
  );
}

export default DetailProduct;
