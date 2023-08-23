import React, { useEffect } from 'react'
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchAllProducts } from '../reducers/productsReducer';
import useCustomSelector from '../../hooks/useCustomSelector';
import { Typography } from '@mui/material';
import ProductList from './ProductList';

const ProductsComponent = () => {
    const dispatch = useAppDispatch();
    const products = useCustomSelector((state) => state.products.products);
    const loading = useCustomSelector((state) => state.products.loading);
    const error = useCustomSelector((state) => state.products.error);
  
    useEffect(() => {
      dispatch(
        fetchAllProducts({
          searchKeyword: null,
          sortBy: null,
          sortDescending: false,
          pageNumber: 1,
          pageSize: 10,
        })
      );
    }, [dispatch]);
  return (
    <div>
        <Typography variant='h4'>
            Products
        </Typography>
        <ProductList products={products} loading={loading} error={error} />
    </div>
  )
}

export default ProductsComponent