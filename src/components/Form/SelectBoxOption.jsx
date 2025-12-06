import React from "react";
import { useFormContext } from "react-hook-form";

function SelectBoxOption({
  name,
  label,
  value,
  type = "radio",
  selected,
  onChange,
}) {
  const { register } = useFormContext();
  const id = `${name}-${value}`;

  const isChecked =
    type === "radio"
      ? selected === value
      : Array.isArray(selected) && selected.includes(value);
  return (
    <>
      <div className="flex-1">
        <input
          id={id}
          type={type}
          value={value}
          checked={isChecked}
          onChange={onChange}
          {...(type === "radio" ? register(name) : {})}
          className="hidden"
        />

        <label
          htmlFor={id}
          className={`block border py-2 px-3 rounded-md text-center cursor-pointer transition select-none
          ${
            isChecked
              ? "bg-brand border-brand text-white"
              : "border-gray-300 hover:border-[#997950] hover:bg-[#997950] hover:text-white"
          }
        `}
        >
          {label}
        </label>
      </div>
    </>
  );
}

export default SelectBoxOption;
