import React, { useEffect } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useCustomSelector from "../../hooks/useCustomSelector";
import { useParams } from "react-router-dom";
import {
  fetchProductsByCategory,
  fetchSingleCategory,
} from "../../redux/reducers/categoriesReducer";
import { Box, Typography } from "@mui/material";
import Products from "../Product/Products";

const CategoryProducts = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const categoryName = useCustomSelector(
    (state) => state.categories.singleCategory?.name
  );
  const categoryProducts = useCustomSelector(
    (state) => state.categories.categoryProducts
  );
  const loading = useCustomSelector((state) => state.categories.loading);
  const error = useCustomSelector((state) => state.categories.error);

  useEffect(() => {
    dispatch(fetchProductsByCategory(String(id)));
    dispatch(fetchSingleCategory(String(id)));
  }, [id, dispatch, categoryName]);

  return (
    <>
      <Typography variant="h4">{categoryName}</Typography>
      {categoryProducts?.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="70vh"
        >
          <Typography variant="h4">No products found.</Typography>
        </Box>
      ) : (
        categoryProducts && (
          <Products
            products={categoryProducts}
            loading={loading}
            error={error}
            singleProduct={null}
          />
        )
      )}
    </>
  );
};

export default CategoryProducts;
