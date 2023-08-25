import React, { useEffect, useState } from 'react'
import useAppDispatch from '../hooks/useAppDispatch';
import { fetchAllProducts } from '../redux/reducers/productsReducer';
import useCustomSelector from '../hooks/useCustomSelector';
import { Typography } from '@mui/material';
import ProductList from './ProductList';
import Header from './Header';

const ProductsComponent = () => {
    const dispatch = useAppDispatch();
    const products = useCustomSelector((state) => state.products.products);
    const loading = useCustomSelector((state) => state.products.loading);
    const error = useCustomSelector((state) => state.products.error);
    const currentUser = useCustomSelector((state) => state.users.currentUser);
    console.log("currentuser in products 5: ", currentUser);
    const [ showAdminButtons, setAdminButtons ] = useState(false);
  
    
    useEffect(() => {
      if (currentUser?.role === "admin") {
        setAdminButtons(true);
      }

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
      <Header />
        <Typography variant='h4'>
            Products
        </Typography>
        <ProductList products={products} loading={loading} error={error} />
    </div>
  )
}

export default ProductsComponent