import React from "react";
import useCustomSelector from "../hooks/useCustomSelector";
import { Container, Grid, Typography } from "@mui/material";
import ProductDisplay from "./ProductDisplay";

const FavoriteProducts = () => {
  const favProducts = useCustomSelector((state) => state.favorites);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Favorite Products
      </Typography>
      {favProducts.length === 0 ? (
        <Typography variant="h6" align="center">
          You have no favorite products yet.
        </Typography>
      ) : (
        // <Grid container spacing={3}>
        //   {favProducts.map((product) => (
        //     <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
        //       <div>
        //         <img src={product.imageUrl} alt={product.name} />
        //         <Typography variant="subtitle1" align="center">
        //           {product.name}
        //         </Typography>
        //         <Typography variant="body2" align="center">
        //           Price: &euro;{product.price}
        //         </Typography>
        //       </div>
        //     </Grid>
        //   ))}
        // </Grid>
        <ProductDisplay loading={false} error={null} product={null} />
      )}
    </Container>
  );
};

export default FavoriteProducts;
