import { InputAdornment, TextField } from "@mui/material";
import React from "react";

function SearchInput({
  label,
  placeholder,
  value,
  onChange,
  onEnter,
  fullWidth = true,
  width,
  icon,
}) {
  return (
    <>
      <TextField
        label={label}
        placeholder={placeholder}
        variant="outlined"
        size="medium"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) onEnter(e);
        }}
        fullWidth={fullWidth}
        sx={{
          width: width || (fullWidth ? "100%" : "auto"),
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          },
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
        }}
        InputProps={{
          startAdornment: icon ? (
            <InputAdornment position="start" sx={{ mr: 1.5 }}>
              {icon}
            </InputAdornment>
          ) : null,
        }}
      />
    </>
  );
}

export default SearchInput;
