import { Box, CircularProgress } from "@mui/material";
import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <Box className="loaderCon">
      <CircularProgress color="inherit" />
    </Box>
  );
}
