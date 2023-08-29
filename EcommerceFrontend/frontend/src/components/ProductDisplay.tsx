import React from "react";
import { fetchSingleProductProps } from "../type/Product";
import { CircularProgress } from "@mui/material";
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
