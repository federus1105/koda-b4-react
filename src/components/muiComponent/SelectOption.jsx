import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function SelectOption({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  fullWidth = true,
}) {
  return (
    <>
      <FormControl fullWidth={fullWidth} size="medium" sx={{ width: "200px" }}>
        <InputLabel>{label}</InputLabel>

        <Select
          value={value}
          label={label}
          onChange={onChange}
          sx={{
            borderRadius: 3,
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#d0d0d0",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#b3b3b3",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6366f1",
              borderWidth: 2,
            },
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          {/* Placeholder */}
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>

          {/* Options */}
          {options.map((opt) => (
            <MenuItem key={opt.id} value={opt.id}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default SelectOption;
