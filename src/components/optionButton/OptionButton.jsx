import React from "react";

function OptionButton({ title, options, selected, onSelect, emptyText }) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="font-medium">{title}</h1>
        <div className="flex justify-between gap-3">
          {options && options.length > 0 ? (
            options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onSelect(opt)}
                className={`border w-full py-2 px-4 cursor-pointer ${
                  selected?.id === opt.id
                    ? "border-[#997950] text-[#997950] font-bold"
                    : "border-gray-300"
                }`}
              >
                {opt.name.charAt(0).toUpperCase() + opt.name.slice(1)}
              </button>
            ))
          ) : (
            <button
              disabled
              className="border w-full py-2 px-4 cursor-not-allowed border-gray-300 text-gray-400"
            >
              {emptyText}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default OptionButton;
