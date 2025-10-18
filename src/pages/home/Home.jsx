import React, { useState } from "react";
import Card from "../../components/cardproduct/Card";
import { ArrowBigLeft, ArrowBigRight, MessageCircleMore } from "lucide-react";
import Chat from "../../components/modal/Chat";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <header className="flex flex-col lg:flex-row lg:flex-row-reverse">
        {/* Right Side: Background Gambar */}
        <div className="lg:w-1/2 w-full">
          <img
            src="/bg-home.svg"
            alt="Coffee Background"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Left Side: Konten (Teks, Tombol, Statistik) */}
        <div className="lg:w-1/2 w-full bg-gradient-to-t from-black to-gray-800 text-white flex items-center justify-center px-6 py-10">
          <div className="flex flex-col gap-7 max-w-md w-full">
            <h1 className="text-3xl lg:text-4xl font-bold">
              Start Your Day with Coffee and Good Meals
            </h1>
            <p className="text-lg font-light">
              We provide high quality beans, good taste, and healthy meals made
              by love just for you. Start your day with us for a bigger smile!
            </p>
            <button className="bg-orange-400 text-black py-3 px-6 rounded-lg w-40 hover:bg-orange-500 cursor-poinnter">
              Get Started
            </button>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-6">
              <div>
                <h2 className="text-orange-400 text-3xl font-bold">90+</h2>
                <p>Staff</p>
              </div>
              <div className="h-12 border-l border-gray-300" />
              <div>
                <h2 className="text-orange-400 text-3xl font-bold">30+</h2>
                <p>Stores</p>
              </div>
              <div className="h-12 border-l border-gray-300" />
              <div>
                <h2 className="text-orange-400 text-3xl font-bold">800+</h2>
                <p>Customer</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Testimoni */}
      <div className="lg:flex lg:flex-row-reverse lg:items-center">
        <img src="/bg-home3.svg" alt="" className="w-full lg:w-1/2" />
        <div className="px-5 flex flex-col gap-5 lg:w-1/2 md:px-16 lg:px-32 my-10">
          <div className="flex my-3">
            <div>
              <div className="border-2 border-orange-300 h-16 mr-4"></div>
            </div>
            <h1 className="text-3xl">
              We Provide{" "}
              <span className="text-[#8E6447]">
                Good <br />
                Coffee
              </span>{" "}
              and <span className="text-[#8E6447]">Healthy Meals</span>
            </h1>
          </div>
          <p className="text-gray-500 text-lg font-light">
            You can explore the menu that we provide with fun and have their own
            taste and make your day better.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <img src="/ceklis.svg" alt="" />
              <p>High quality beans</p>
            </div>
            <div className="flex gap-2">
              <img src="/ceklis.svg" alt="" />
              <p>Healthy meals, you can request the ingredients</p>
            </div>
            <div className="flex gap-2">
              <img src="/ceklis.svg" alt="" />
              <p>Free member card with a minimum purchase of IDR 200.000.</p>
            </div>
            <div className="flex gap-2">
              <img src="/ceklis.svg" alt="" />
              <p>Chat with our staff to get better experience for ordering</p>
            </div>
          </div>
        </div>
      </div>
      {/* Product */}
      <div className="px-6 my-15 lg:px-32 md:px-15">
        <div className="text-center my-10">
          <h1 className="text-2xl font-semibold">
            Here Is People <span className="text-[#A8774E]">Favorite</span>
          </h1>
          <div className="w-15 h-1 bg-orange-500 mx-auto my-2"></div>
          <p className="text-gray-500 max-w-md mx-auto">
            You can explore the menu that we provide with fun and have their own
            taste and make your day better.
          </p>
        </div>
        <Card />
      </div>
      {/* map */}
      <div className="px-6 py-15 bg-gray-100 flex flex-col gap-5 md:px-15">
        <h1 className="text-center text-2xl lg:text-3xl">
          <span className="text-[#8E6447]">Visit Our People</span> in The Spot
          on The Map Below
        </h1>
        <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        <div>
          <p className="text-gray-500 text-center">
            You can explore the menu that we provide with fun and have their own
            taste and make your day better.
          </p>
        </div>
        <div className="lg:px-30">
          <img
            src="/map.svg"
            alt=""
            className="bg-gray-500 mx-auto md:w-full"
          />
        </div>
      </div>
      {/* Testimoni */}
      <div className="bg-black px-6 py-15 text-white flex flex-col lg:flex-row gap-5 md:px-15 lg:px-32">
        <div className="lg:w-1/2">
          <img src="/robert.svg" alt="" className="w-full" />
        </div>
        <div className="flex flex-col gap-6 lg:w-1/2">
          <h1 className="text-center lg:text-left">Testimonial</h1>
          <div className="flex gap-2 items-center">
            <div className="w-1 h-10 bg-orange-500"></div>
            <h1 className="lg:text-4xl">Viezh Robert</h1>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-orange-400">Manager Coffe Shop</h1>
            <p>
              “Wow... I am very happy to spend my whole day here. the Wi-fi is
              good, and the coffee and meals tho. I like it here!! Very
              recommended!
            </p>
          </div>
          <div className="flex items-center gap-2 lg:gap-7">
            {Array.from({ length: 5 }).map((_, index) => (
              <img key={index} src="/star.svg" alt="Star" />
            ))}
            <p>5.0</p>
          </div>
          <div className="flex gap-2">
            <ArrowBigLeft size={30} className="cursor-pointer" />
            <ArrowBigRight size={30} className="cursor-pointer" />
          </div>
        </div>
      </div>
      <button
        className="flex items-center justify-center fixed bottom-6 right-6 bg-orange-500 text-white w-13 h-13 rounded-full hover:bg-orange-600"
        onClick={() => setModalOpen(true)}
      >
        <MessageCircleMore size={30} />
      </button>
      <Chat isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default Home;
