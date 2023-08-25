import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateProduct, Product, ProductState, ProductUpdate } from "../../type/Product";
import axios, { AxiosError } from "axios";
import { BASE_URL, FetchAllParams } from "../../type/Shared";

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
}

// const BASE_URL = 'http://localhost:5034/api/v1'

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

export const addNewProduct = createAsyncThunk(
    'createProduct',
    async ({ file, product }: { file: File | null; product: CreateProduct }) => {
        let imageUrl = ''
        if (file) {
            imageUrl = await uploadFile(file)
        }

        const productData: CreateProduct = {
            ...product,
            // imageUrl: file ? [imageUrl] : [],
        }

        try {
            const response = await axios.post<Product>(`${BASE_URL}/products`, productData)
            return response.data
        } catch (error) {
            throw new Error('Failed to create a new product')
        }
    }
)

export const updateExistingProduct = createAsyncThunk(
    "updateProduct",
    async (product: ProductUpdate) => {
        try {
            const response = await axios.put<Product>(`${BASE_URL}/products/${product.id}`, product)
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

export const deleteAProduct = createAsyncThunk(
    "deleteProduct",
    async (productId: number) => {
        try {
            const response = await axios.delete<Boolean>(`${BASE_URL}/products/${productId}`)
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
            .addCase(addNewProduct.pending, (state) => {
                state.loading = true
                state.error = ""
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
                else {
                    console.log(action.payload)
                    state.products.push(action.payload)
                }
            })
            .addCase(addNewProduct.rejected, (state) => {
                state.error = "Error adding new product"
                state.loading = false
            })
            .addCase(updateExistingProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(updateExistingProduct.fulfilled, (state, action) => {
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
            .addCase(updateExistingProduct.rejected, (state) => {
                state.error = "Error updating product"
                state.loading = false
            })
            .addCase(deleteAProduct.rejected, (state) => {
                state.loading = true
            })
            // .addCase(deleteAProduct.fulfilled, (state, action) => {
            //     state.loading = false
            //     const productId = action.meta.arg
            //     state.products = state.products.filter((product) => product.id !== productId)
                
            // })
    }
})

const productsReducer = productsSlice.reducer
// export const { cleanUpProductReducer, sortProductByPrice, sortProductByCategory, sortProductByName } = productsSlice.actions
// export const { sortProductsByPriceAsc, sortProductsByPriceDesc, sortProductsByNameAsc, sortProductsByNameDesc } = productsSlice.actions
export default productsReducer