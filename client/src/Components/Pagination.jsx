import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Pagination({ count }) {
  return (
    <Stack spacing={2}>
      <Pagination count={count} color="primary" />
    </Stack>
  );
}
