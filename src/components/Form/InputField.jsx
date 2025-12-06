import React from "react";
import { useFormContext } from "react-hook-form";

function InputField({ label, name, type = "text", rules = {}, placeholder }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div>
        <label htmlFor={name} className="block text-sm font-medium mb-2">
          {label}
        </label>

        <input
          id={name}
          type={type}
          {...register(name, rules)}
          placeholder={placeholder}
          className={`w-full border rounded-md px-3 py-2 ${
            errors[name] ? "border-red-500" : "border-gray-300"
          }`}
        />

        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
        )}
      </div>
    </>
  );
}

export default InputField;
