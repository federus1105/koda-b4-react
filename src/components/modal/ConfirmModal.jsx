import React from "react";

function ConfirmModal({
  isOpen,
  title = "Konfirmasi",
  message,
  onCancel,
  onConfirm,
  confirmText = "Hapus",
  cancelText = "Batal",
}) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50 animate-fadeIn">
        <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl animate-scaleIn">
          {/* Title */}
          <h2 className="font-semibold text-xl text-gray-800">{title}</h2>

          {/* Message */}
          {message && (
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              {message}
            </p>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onCancel}
              className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg 
               text-gray-700 hover:bg-gray-100 transition-all"
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg 
               hover:bg-red-700 shadow-md transition-all"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmModal;
