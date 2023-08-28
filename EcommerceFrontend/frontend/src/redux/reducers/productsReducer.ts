import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateProduct, Product, ProductState, ProductUpdate } from "../../type/Product";
import axios, { AxiosError } from "axios";
import { BASE_URL, FetchAllParams } from "../../type/Shared";
import { RootState } from "../rootReducer";

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
}

export const fetchAllProducts = createAsyncThunk(
    "fetchAllProducts",
    async ({ 
        searchKeyword = null,
        sortBy = "UpdatedAt",
        sortDescending = false,
        pageNumber = 1,
        pageSize = 10,
     }: FetchAllParams) => {
        try {
            const response = await axios.get<Product[]>(`${BASE_URL}/products`, {
                params: {
                  SearchKeyword: searchKeyword,
                  SortBy: sortBy,
                  SortDescending: sortDescending,
                  PageNumber: pageNumber,
                  PageSize: pageSize,
                },
              });
            console.log("products: ", response.data)
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

export const fetchSingleProduct = createAsyncThunk(
    "product",
    async (productId: string) => {
        try {
            const response = await axios.get<Product>(`${BASE_URL}/products/${productId}`)
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

export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    try {
        const response = await axios.post(`${BASE_URL}/files/upload`, formData)
        const { location } = response.data
        return location
    } catch (error) {
        throw new Error('Failed to upload file')
    }
}

export const createProduct = createAsyncThunk(
    "createProduct",
    async (product: CreateProduct, { getState }) => {
        try {
            const state = getState() as RootState;
            const token = state.users.currentUser?.token;
            const response = await axios.post<Product>(`${BASE_URL}/products`, product, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
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

export const updateProduct = createAsyncThunk(
    "updateProduct",
    async (product: ProductUpdate, { getState }) => {
        try {
            const state = getState() as RootState;
            const token = state.users.currentUser?.token;
            const response = await axios.put<Product>(`${BASE_URL}/products/${product.id}`, product, {
                headers: {
                    "Authorization": `Bearer ${token}`
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

export const deleteProduct = createAsyncThunk(
    "deleteProduct",
    async (productId: string, { getState }) => {
        try {
            const state = getState() as RootState;
            const token = state.users.currentUser?.token;
            const response = await axios.delete<Boolean>(`${BASE_URL}/products/${productId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
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

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        cleanUpProductReducer: (state) => {
            return initialState
        },
       
    },
    extraReducers: (build) => {
        build
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
                else {
                    state.products = action.payload
                }
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.loading = false
                state.error = "Error fetching products. Please try again later."
            })
            .addCase(fetchSingleProduct.pending, (state) => {
                state.loading = true
                state.error = ""
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.loading = false

                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
                // else {
                //     state.singleProduct = action.payload
                // }
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.error = action.payload as string
                state.loading = false
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
                else {
                    console.log(action.payload)
                    state.products.push(action.payload)
                }
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.error = action.error.message as string
                state.loading = false
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
                else if ((action.payload as Product).id) {
                    const updatedIndex = state.products.findIndex((product) => product.id === (action.payload as Product).id)
                    if (updatedIndex !== -1) {
                        state.products[updatedIndex] = action.payload as Product
                    }
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.error.message as string
                state.loading = false
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = false
                state.error = null
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = true
                state.error = action.error.message as string
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false
                const productId = action.meta.arg
                state.products = state.products.filter((product) => product.id !== productId)
            })
            
    }
})

const productsReducer = productsSlice.reducer
export default productsReducer