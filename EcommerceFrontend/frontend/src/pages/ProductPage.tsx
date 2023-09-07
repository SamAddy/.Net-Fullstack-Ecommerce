import React, { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { useParams } from "react-router-dom";
import useCustomSelector from "../hooks/useCustomSelector";
import { fetchSingleProduct } from "../redux/reducers/productsReducer";
import ProductDisplay from "../components/ProductDisplay";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useCustomSelector((state) => state.products.singleProduct);
  const error = useCustomSelector((state) => state.products.error);
  const loading = useCustomSelector((state) => state.products.loading);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      <ProductDisplay loading={loading} error={error} product={product} />
    </div>
  );
};

export default ProductPage;
