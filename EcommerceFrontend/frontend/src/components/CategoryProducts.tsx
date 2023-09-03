import React, { useEffect } from 'react'
import useAppDispatch from '../hooks/useAppDispatch'
import useCustomSelector from '../hooks/useCustomSelector';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategory } from '../redux/reducers/categoriesReducer';
import { Typography } from '@mui/material';
import Products from './Products';
import Header from './Header';

const CategoryProducts = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const categoryProducts = useCustomSelector((state) => state.categories.categoryProducts);
    const loading = useCustomSelector((state) => state.categories.loading);
    const error = useCustomSelector((state) => state.categories.error);

    useEffect(() => {
        dispatch(fetchProductsByCategory(String(id)))
    }, [dispatch])

  return (
    <div>
        <Header />
        <Typography>{}</Typography>
        {categoryProducts && (
            <Products products={categoryProducts} loading={loading} error={error} singleProduct={null} />
        )}
    </div>
  )
}

export default CategoryProducts