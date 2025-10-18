import React from "react";
import { Send } from "lucide-react";

function Chat({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 z-5" onClick={onClose}></div>
      {/* Chat Box */}
      <div className="fixed bottom-24 left-6 right-6 md:left-auto md:right-10 md:w-[380px] bg-white rounded-xl shadow-lg z-50 overflow-hidden">
        {/* Header */}
        <div className="bg-orange-500 p-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center gap-3">
            <img src="/admin.svg" alt="Admin" className="w-9" />
            <div>
              <h2 className="text-white font-semibold text-sm">Maria Angela</h2>
              <p className="text-white text-xs">Admin Support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-lg"
          >
            ×
          </button>
        </div>

        {/* Chat Content */}
        <div className="p-4 flex flex-col gap-3 max-h-60 overflow-y-auto">
          {/* Admin message */}
          <div className="flex items-start gap-2">
            <img src="/admin.svg" alt="Admin" className="w-9" />
            <div className="bg-gray-100 text-sm px-4 py-2 rounded-2xl rounded-bl-none">
              Halo, Ada yang bisa kami bantu?
            </div>
          </div>

          {/* User message */}
          <div className="flex items-end justify-end gap-2">
            <div className="bg-orange-100 text-sm px-4 py-2 rounded-2xl rounded-br-none max-w-[70%]">
              Saya kesulitan mencari kopi
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t px-3 py-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Masukan Pesan Anda"
            className="flex-1 text-sm px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full">
            <Send />
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
