import { combineReducers } from '@reduxjs/toolkit'

import usersReducer from './reducers/usersReducer';
import productsReducer from './reducers/productsReducer';
import categoriesReducer from './reducers/categoriesReducer';

export const rootReducer = combineReducers({
    users: usersReducer,
    products: productsReducer,
    categories: categoriesReducer,
  });

export type RootState = ReturnType<typeof rootReducer>