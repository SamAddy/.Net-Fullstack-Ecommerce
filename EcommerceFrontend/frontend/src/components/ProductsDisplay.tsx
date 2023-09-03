import React, { useEffect } from 'react'
import useAppDispatch from '../hooks/useAppDispatch'
import useCustomSelector from '../hooks/useCustomSelector';
import { fetchAllProducts } from '../redux/reducers/productsReducer';
import Products from './Products';

const ProductsDisplay = () => {
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
                pageSize: 10
            })
        )
    }, [dispatch]);
  return (
    <div>
        <Products products={products} loading={loading} error={error}  singleProduct={null}/>    
    </div>
  )
}

export default ProductsDisplay