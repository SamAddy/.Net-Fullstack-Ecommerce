import React, { useEffect } from 'react'
import { Typography } from '@mui/material';

import useAppDispatch from '../hooks/useAppDispatch'
import useCustomSelector from '../hooks/useCustomSelector';
import { fetchAllCategories } from '../redux/reducers/categoriesReducer';
import CategoryList from './CategoryList';

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
        <Typography variant='h4' 
          sx = {{ fontWeight: 'bold',
            textDecoration: 'underline',
            paddingTop: '2.5em',
            textAlign: 'center'
          }}
        >
            <span>Feat</span>ured Categories
        </Typography>
        <CategoryList categories={categories} loading={loading} error={error} />
    </div>
  )
}

export default CategoriesComponent