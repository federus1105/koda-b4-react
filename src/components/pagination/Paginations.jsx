import { Stack, Pagination } from "@mui/material";
import React from "react";

function Paginations({
  totalPages,
  currentPage,
  onChange,
  siblingCount = 1,
  boundaryCount = 0,
  color = "#997950",
}) {
  return (
    <>
      <Stack spacing={2} alignItems="center" className="mb-16">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => onChange(value)}
          variant="outlined"
          shape="rounded-full"
          siblingCount={siblingCount}
          boundaryCount={boundaryCount}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#333",
              borderColor: color,
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: color,
              color: "#fff",
              "&:hover": {
                backgroundColor: "#b28b5b",
              },
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "#f5f0e6",
            },
          }}
        />
      </Stack>
    </>
  );
}

export default Paginations;
