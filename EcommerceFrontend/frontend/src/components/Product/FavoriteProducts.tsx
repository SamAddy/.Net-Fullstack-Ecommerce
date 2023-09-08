import React from "react";
import useCustomSelector from "../../hooks/useCustomSelector";
import { Container, Grid, Typography } from "@mui/material";
import Products from "./Products";

const FavoriteProducts = () => {
  const favProducts = useCustomSelector((state) => state.favorites);

  return (
    <Container maxWidth="xl">
      <Typography 
        variant="h4" 
        sx={{
          fontWeight: "bold",
          padding: "1.5em",
          textAlign: "center",
        }}
      >
        Favorite Products
      </Typography>
      {favProducts.length === 0 ? (
        <Grid container justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography variant="h5" align="center">You have no favorite products yet.</Typography>
      </Grid>
      ) : (
        <Products products={favProducts} loading={false} error={null} singleProduct={null} />
      )}
    </Container>
  );
};

export default FavoriteProducts;
