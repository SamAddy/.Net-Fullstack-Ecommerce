import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchAllParams } from "../../type/Shared";
import axios, { AxiosError } from "axios";
import { Category, CategoryState } from "../../type/Category";

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: '',
  };

const BASE_URL = 'http://localhost:5034/api/v1'

export const fetchAllCategories = createAsyncThunk(
    'fetchAllCategories',
    async ({
      searchKeyword = null,
      sortBy = 'UpdatedAt',
      sortDescending = false,
      pageNumber = 1,
      pageSize = 10,
    }: FetchAllParams) => {
      try {
        const response = await axios.get<Category[]>(`${BASE_URL}/categories`, {
          params: {
            SearchKeyword: searchKeyword,
            SortBy: sortBy,
            SortDescending: sortDescending,
            PageNumber: pageNumber,
            PageSize: pageSize,
          },
        });
        console.log("Categories: " + response.data);
        return response.data;
      } catch (e) {
        const error = e as AxiosError;
        if (error.response) {
          throw new Error(JSON.stringify(error.response.data));
        }
        throw new Error(error.message);
      }
    }
  );

  const categoriesSlice = createSlice({
    name: 'category', 
    initialState,
    reducers: {
      cleanUpCategoryReducer: (state) => {
        return initialState;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllCategories.pending, (state) => {
          state.loading = true;
          state.error = '';
        })
        .addCase(fetchAllCategories.fulfilled, (state, action) => {
          state.loading = false;
          state.categories = action.payload;
        })
        .addCase(fetchAllCategories.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message as string;
        });
    },
  });
  
  const categoriesReducer = categoriesSlice.reducer;
  const { cleanUpCategoryReducer } = categoriesSlice.actions;
  
  export default categoriesReducer;