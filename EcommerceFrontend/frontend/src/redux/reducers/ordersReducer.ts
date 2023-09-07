import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order, OrderState } from "../../type/Order";
import axios, { AxiosError } from "axios";
import { BASE_URL, FetchAllParams } from "../../type/Shared";
import { RootState } from "../rootReducer";

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
    singleOrder: null
}

export const fetchAllOrders = createAsyncThunk(
    "fetchAllOrders",
    async ({
        searchKeyword = null,
        sortBy = 'UpdatedAt',
        sortDescending = false,
        pageNumber = 1,
        pageSize = 10,
    }: FetchAllParams, { getState }) => {
        try {
            const state = getState() as RootState;
            const token = state.users.currentUser?.token;
            const response = await axios.get<Order[]>(`${BASE_URL}/orders`, {
                params: {
                    SearchKeyword: searchKeyword,
                    SortBy: sortBy,
                    SortDescending: sortDescending,
                    PageNumber: pageNumber,
                    PageSize: pageSize,
                  },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            if (error.response) {
                return JSON.stringify(error.response.data);
            }
            return error.message;
        }
    }
)
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload as Order[]
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string
            })
    }
})

const ordersReducer = orderSlice.reducer;

export default ordersReducer;