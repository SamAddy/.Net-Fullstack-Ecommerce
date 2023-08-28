import React, { useEffect, useState } from 'react'
import useAppDispatch from '../hooks/useAppDispatch'
import useCustomSelector from '../hooks/useCustomSelector';
import { fetchAllCategories } from '../redux/reducers/categoriesReducer';
import { Typography } from '@mui/material';
import ManageLoading from './ManageLoading';
import CategoryList from './CategoryList';
import { Category } from '../type/Category';

const CategoriesComponent = () => {
    const dispatch = useAppDispatch();
    const categories = useCustomSelector((state) => state.categories.categories);
    const loading = useCustomSelector((state) => state.categories.loading);
    const error = useCustomSelector((state) => state.categories.error);

    useEffect(() => {
        dispatch(
            fetchAllCategories({
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
            Featured Categories
        </Typography>
        <CategoryList categories={categories} loading={loading} error={error} />
    </div>
  )
}

export default CategoriesComponent