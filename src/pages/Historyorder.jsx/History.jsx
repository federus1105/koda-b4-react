import React from "react";
import { Calendar, MoveRight, MessageSquareMore } from "lucide-react";
import ItemHistory from "../../components/cardproduct/ItemHistory";

function History() {
  return (
    <>
      <div className="my-20 mx-5 lg:flex lg:mx-30 justify-center gap-20 md:mx-15 lg:my-30">
        <div className="lg:w-1/2 flex flex-col gap-5">
          <h1 className="font-medium text-xl lg:text-3xl">History Order</h1>
          <div className="flex flex-col justify-between gap-3 lg:flex-row-reverse">
            <div className="flex items-center bg-gray-100 py-3 px-2 gap-2 w-fit">
              <Calendar />
              <select name="" id="">
                <option value="januari">Januari 2025</option>
                <option value="february">February 2025</option>
                <option value="march">March 2025</option>
              </select>
            </div>
            {/* Button Select */}
            <div className="bg-gray-100 py-3 px-4 flex justify-between lg:gap-4">
              <button className="bg-white py-2 px-2">On Progress</button>
              <button>Sending Goods</button>
              <button>Finish Order</button>
            </div>
          </div>
          {/* Item Order */}
          <div>
            <ItemHistory />
          </div>
          {/* Paganitaion */}
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
              <button className="w-9 h-9 rounded-full flex items-center justify-center bg-orange-400">
                <MoveRight className="text-white" />
              </button>
            </div>
          </div>
        </div>
        <div className="lg:w-1/4 border h-fit border-gray-300 p-5 flex flex-col gap-3 lg:mt-15">
          <MessageSquareMore />
          <p className="font-medium text-gray-500">Send Us Message</p>
          <p className="text-gray-500">
            if your unable to find answer or find your product quickly, please
            describe your problem and tell us. we will give you solution.
          </p>
          <button className="cursor-pointer bg-orange-400 py-2 rounded-md">
            Send Message
          </button>
        </div>
      </div>
    </>
  );
}

export default History;
