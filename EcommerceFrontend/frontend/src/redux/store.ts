import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsReducer';
import usersReducer from './reducers/usersReducer';
import categoriesReducer from './reducers/categoriesReducer';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    categories: categoriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type GlobalState = RootState;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;