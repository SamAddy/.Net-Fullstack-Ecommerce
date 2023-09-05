import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../type/Product';

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: [] as Product [],
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
        state.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((product) => product.id !== action.payload.id);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;