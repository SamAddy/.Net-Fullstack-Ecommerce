import React from "react";
import useCustomSelector from "../hooks/useCustomSelector";
import { Container, Typography } from "@mui/material";
import Products from "./Products";

const FavoriteProducts = () => {
  const favProducts = useCustomSelector((state) => state.favorites);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" align="center" gutterBottom>
        Favorite Products
      </Typography>
      {favProducts.length === 0 ? (
        <Typography variant="h6" align="center">
          You have no favorite products yet.
        </Typography>
      ) : (
        <Products products={favProducts} loading={false} error={null} singleProduct={null} />
      )}
    </Container>
  );
};

export default FavoriteProducts;
