import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, FetchAllParams } from "../../type/Shared";
import axios, { AxiosError } from "axios";
import { Category, CategoryState, NewCategory } from "../../type/Category";
import { RootState } from "../rootReducer";

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
  };

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

  export const createCategory = createAsyncThunk(
    "createCategory",
    async (category: NewCategory, { getState }) => {
      try {
        const state = getState() as RootState;
        const token = state.users.currentUser?.token;
        const response = await axios.post(`${BASE_URL}/categories`, category,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        return response.data;
      } catch(err) {
        const error = err as AxiosError;
        if (error.response) {
          return JSON.stringify(error.response.data);
        }
        return error.message;
      }
    }
  )

  export const updateCategory = createAsyncThunk(
    "updateCategory",
    async (category: Category, { getState }) => {
      try {
        const state = getState() as RootState;
        const token = state.users.currentUser?.token
        
        const response = await axios.put(`${BASE_URL}/categories/${category.id}`, category,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        return response.data;
      } catch(err) {
        const error = err as AxiosError;
        if (error.response) {
          return JSON.stringify(error.response.data);
        }
        return error.message;
      }
    } 
  )

  export const deleteCartegory = createAsyncThunk(
    "deleteCartegory",
    async (cartegoryId: string, { getState }) => {
        try {
          const state = getState() as RootState;
          const token = state.users.currentUser?.token
          if (token === null)
          {
            throw new Error('Authorization token not found.');
          }
            const response = await axios.delete(`${BASE_URL}/categories/${cartegoryId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            return response.data
        }
        catch (e) {
            const error = e as AxiosError
            if (error.response) {
                return JSON.stringify(error.response.data)
            }
            return error.message
        }
    }
)

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
        })
        .addCase(createCategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createCategory.fulfilled, (state, action) => {
          state.loading = false;
          if (typeof action.payload === "string") {
            state.error = action.payload;
          }
          else {
            state.loading = false;
            state.categories.push(action.payload);
          }
        })
        .addCase(createCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message as string;
        })
        .addCase(updateCategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
          state.loading = false;
          const updatedCategoryIndex = state.categories.findIndex(
            category => category.id === action.payload.id
          );
          if (updatedCategoryIndex !== -1) {
            state.categories[updatedCategoryIndex] = action.payload;
          }
        })
        .addCase(updateCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message as string;
        })
        .addCase(deleteCartegory.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteCartegory.fulfilled, (state, action) => {
          state.loading = false
          if (action.payload instanceof AxiosError) {
              state.error = action.payload.message
          }
          else {
              const categoryId = action.meta.arg
              state.categories = state.categories.filter((category) => category.id !== categoryId)
          }
        })
        .addCase(deleteCartegory.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    },
  });
  
  const categoriesReducer = categoriesSlice.reducer;
  const { cleanUpCategoryReducer } = categoriesSlice.actions;
  
  export default categoriesReducer;