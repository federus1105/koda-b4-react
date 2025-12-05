import React, { useState } from "react";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import Chat from "../../components/modal/Chat";
import FavoriteProduct from "../../components/cardproduct/FavoriteProduct";
import { Link } from "react-router-dom";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const features = [
    "High quality beans sourced from premium plantations",
    "Healthy meals with customizable ingredients",
    "Free member card with minimum purchase of IDR 200.000",
    "Chat with our staff for better ordering experience",
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        {/* Hero Section */}
        <header className="relative overflow-hidden">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center min-h-screen">
              {/* Left Content */}
              <div className="lg:w-1/2 w-full px-6 lg:px-16 py-16 md:py-30 lg:py-0 z-2">
                <div className="max-w-xl">
                  <div className="inline-block mb-4">
                    <span className="bg-brand text-white px-4 py-2 rounded-full text-sm font-medium">
                      ☕ Premium Senja Kopi-Kiri
                    </span>
                  </div>

                  <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                    Start Your Day with
                    <span className="text-brand"> Coffee </span>
                    and Good Meals
                  </h1>

                  <p className="text-lg text-gray-300 mb-8">
                    We provide high quality beans, exceptional taste, and
                    healthy meals crafted with love just for you. Begin your
                    morning with us for a brighter day ahead.
                  </p>

                  <Link to={"/product"}>
                    <button className="bg-brand text-white px-8 py-4 rounded-xl font-semibold cursor-pointer flex items-center gap-3">
                      Get Started
                      <ArrowRight size={20} />
                    </button>
                  </Link>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-700">
                    <div className="text-center lg:text-left">
                      <h3 className="text-4xl font-bold text-brand mb-2">
                        90+
                      </h3>
                      <p className="text-gray-300 font-medium">Expert Staff</p>
                    </div>
                    <div className="text-center lg:text-left">
                      <h3 className="text-4xl font-bold text-brand mb-2">
                        30+
                      </h3>
                      <p className="text-gray-300 font-medium">
                        Store Locations
                      </p>
                    </div>
                    <div className="text-center lg:text-left">
                      <h3 className="text-4xl font-bold text-brand mb-2">
                        800+
                      </h3>
                      <p className="text-gray-300 font-medium">
                        Happy Customers
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:w-1/2 w-full relative">
                <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
                  <img
                    src="/bg-home.svg"
                    alt="Coffee Background"
                    className="relative w-full h-[500px] lg:h-[700px] object-cover rounded-3xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* About Section */}
        <section className="py-20 lg:py-32 bg-gray-900">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Image */}
              <div className="lg:w-1/2 relative ">
                <div className="absolute inset-0 bg-brand/20 rounded-3xl"></div>
                <img
                  src="/bg-home3.svg"
                  alt="Coffee and Meals"
                  className="relative w-full rounded-3xl shadow-2xl"
                />
              </div>

              {/* Content */}
              <div className="lg:w-1/2">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-1 h-20 bg-brand rounded-full"></div>
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-100 mb-6">
                      We Provide{" "}
                      <span className="text-brand">Good Coffee</span> and{" "}
                      <span className="text-brand">Healthy Meals</span>
                    </h2>
                  </div>
                </div>

                <p className="text-gray-300 text-lg mb-8">
                  Explore our carefully curated menu with unique flavors that
                  will brighten your day. Every item is crafted with passion and
                  premium ingredients.
                </p>

                <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl shadow-lg"
                    >
                      <div className="bg-brand p-2 rounded-lg">
                        <CheckCircle2 className="text-white" size={24} />
                      </div>
                      <p className="text-gray-100 font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
                Customer <span className="text-brand">Favorites</span>
              </h2>
              <div className="w-24 h-1.5 bg-brand mx-auto rounded-full mb-6"></div>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Discover our most loved items, carefully selected by our
                community of coffee enthusiasts and food lovers.
              </p>
            </div>

            {/* Product Cards */}
            <div className="flex items-center justify-center">
              <FavoriteProduct />
            </div>
          </div>
        </section>

        {/* Floating Chat Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="fixed bottom-8 right-8 bg-brand text-white p-4 rounded-2xl"
        >
          <MessageCircle size={28} />
        </button>

        <Chat isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </>
  );
}

export default Home;
