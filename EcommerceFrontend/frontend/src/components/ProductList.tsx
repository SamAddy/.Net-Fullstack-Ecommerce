import React, { useEffect } from "react";
import { Product, ProductState } from "../type/Product";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { AddShoppingCart, Delete, Edit } from "@mui/icons-material";
import BoldIconButton from "../styles/Component/BoldIconButton";
import useCustomSelector from "../hooks/useCustomSelector";

const ProductList = ({ products, loading, error, showAdminButtons }: ProductState) => {
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <p>Error loading content</p>;
  }
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
        // display="flex"
        // flexWrap="wrap"
      >
        {products.map((product) => (
          <Grid item key={product.id} xs={8} sm={4} md={4} lg={2}>
            <Card
              // sx={{ width: 300, height: "100%" }}
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                sx={{ height: 300, backgroundSize: "contain" }}
                image={product.imageUrl}
                title={product.name}
              />
              <CardContent>
                <Typography variant="h5" component="div" textAlign="center">
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions
                style={{ justifyContent: "space-between", marginTop: "auto" }}
              >
                {/* <BoldIconButton aria-label="add to favorites" bold>
                  <FavoriteBorderSharpIcon />
                </BoldIconButton>
                <Typography>&euro;{product.price}</Typography>
                <BoldIconButton aria-label="add to cart" bold>
                  <AddShoppingCart />
                </BoldIconButton> */}
                {showAdminButtons ? (
                  <>
                    <BoldIconButton aria-label="delete product" bold>
                      <Delete />
                    </BoldIconButton>
                    <Typography>
                      &euro;{product.price}
                    </Typography>
                    <BoldIconButton aria-label="edit product" bold>
                      <Edit/>
                    </BoldIconButton>
                  </>
                ) : (
                  <>
                    <BoldIconButton aria-label="add to favorites" bold>
                      <FavoriteBorderSharpIcon />
                    </BoldIconButton>
                    <Typography>
                      &euro;{product.price}
                    </Typography>
                    <BoldIconButton aria-label="add to cart" bold>
                      <AddShoppingCart />
                    </BoldIconButton>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
