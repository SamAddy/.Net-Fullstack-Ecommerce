import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";

import useCustomSelector from "../../hooks/useCustomSelector";
import Products from "./Products";
import useAppDispatch from "../../hooks/useAppDispatch";
import { fetchProductsByCategory } from "../../redux/reducers/categoriesReducer";

const FeaturedProducts = () => {
  const dispatch = useAppDispatch();
  const id = "bc1fd69e-c4ba-4e79-a9f3-811bcd80dfd2";
  const featuredProducts = useCustomSelector(
    (state) => state.categories.categoryProducts
  );
  const loading = useCustomSelector((state) => state.categories.loading);
  const error = useCustomSelector((state) => state.categories.error);

  useEffect(() => {
    dispatch(fetchProductsByCategory(String(id)));
  }, [dispatch]);

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textDecoration: "underline",
          paddingTop: "2em",
          textAlign: "center",
        }}
      >
        <span>Feat</span>ured Products
      </Typography>
      {featuredProducts?.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="70vh"
        >
          <Typography variant="h4">No products found.</Typography>
        </Box>
      ) : (
        featuredProducts && (
          <Products
            products={featuredProducts}
            loading={loading}
            error={error}
            singleProduct={null}
          />
        )
      )}
    </div>
  );
};

export default FeaturedProducts;
