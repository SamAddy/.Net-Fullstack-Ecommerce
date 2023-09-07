import { combineReducers } from '@reduxjs/toolkit'

import usersReducer from './reducers/usersReducer';
import productsReducer from './reducers/productsReducer';
import categoriesReducer from './reducers/categoriesReducer';
import ordersReducer from './reducers/ordersReducer';
import favoriteReducer from './reducers/favoriteReducer';
import cartReducer from './reducers/cartReducer';

export const rootReducer = combineReducers({
    users: usersReducer,
    products: productsReducer,
    categories: categoriesReducer,
    orders: ordersReducer,
    favorites: favoriteReducer,
    cart: cartReducer,
  });

export type RootState = ReturnType<typeof rootReducer>