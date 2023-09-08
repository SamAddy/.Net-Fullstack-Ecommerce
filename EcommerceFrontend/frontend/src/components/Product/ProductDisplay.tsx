import React from "react";
import { CircularProgress } from "@mui/material";

import { fetchSingleProductProps } from "../../type/Product";
import ProductDetails from "./ProductDetails";

const ProductDisplay = ({
  loading,
  error,
  product,
}: fetchSingleProductProps) => {
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <p> {error} </p>;
  }
  if (product) {
    return <ProductDetails product={product} />;
  }
  return null;
};

export default ProductDisplay;
