import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { Axios, AxiosError } from "axios";

import { NewUser, User, UserCredentials, UserState, UserUpdate } from "../../type/User";
import { BASE_URL } from "../../type/Shared";

// const BASE_URL = 'http://localhost:5034/api/v1'

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    isLoggedIn: false,
}

export const fetchAllUsers = createAsyncThunk(
    "fetchAllUsers",
    async () => {
        try {
            const response = await axios.get<User[]>(`${BASE_URL}/users`)
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

export const getUserById = async (id: number) => {
    try {
        const response = await axios.get<User>(`${BASE_URL}/users/${id}`)
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

export const createUser = async (userData: NewUser) => {
    try {
        const response = await axios.post(`${BASE_URL}/users`, userData)
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

export const authenticate = createAsyncThunk (
    "authenticate",
    async (access_token: string) => {
      try {
        const authentication = await axios.get<User>(`${BASE_URL}/auth/profile`, {
          headers: {
            "Authorization": `Bearer ${access_token}`
          }
      })
      return authentication.data;
      } catch (err) {
        const error = err as AxiosError;
        if (error.response)
        {
            return JSON.stringify(error.response.data);
        }
        return error.message;
      }
    }
  )

export const login = createAsyncThunk (
    "login",
    async ({ email, password }: UserCredentials, { dispatch }) => {
      try {
        const result = await axios.post(`${BASE_URL}/auth/login`, {email, password});
        localStorage.setItem("token", result.data);
        const authentication = await dispatch(authenticate(result.data));
        return authentication.payload as User;
      }
      catch (err) {
        const error = err as AxiosError;
        if (error.response) {
            console.log("Backend Error Response:", error.response.data);
            return JSON.stringify(error.response.data)
          }
        return error.message;
      }
    }
  )

export const registerUser = createAsyncThunk(
    "register",
    async (userData: NewUser) => {
        try {
            const response = await createUser(userData)
            return response
        }
        catch(e) {
            const error = e as AxiosError
            if (error.response) {
                return JSON.stringify(error.response.data)
            }
            return error.message
        }
    }
)

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        cleanUpUsersReducer: (state) => {
            return initialState
        },
        logout: (state) => {
            localStorage.removeItem("token")
            state.currentUser = undefined
            state.error = ""
        }
    },
    extraReducers: (build) => {
        build
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
                else {
                    state.users = action.payload
                }
                state.loading = false
            })
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true
                state.error = ""
            })
            .addCase(fetchAllUsers.rejected, (state) => {
                state.error = "Error fetching users. Please try again."
                state.loading = false
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = ""
            }) 
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                }
                else {
                    state.users.push(action.payload)
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload as string
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                if (typeof action.payload === "string")
                {
                    state.error = action.payload;
                    state.currentUser = null;
                    console.log("current User: " + state.currentUser);
                    state.isLoggedIn = false;
                }
                else {
                    state.error = null;
                    state.currentUser = action.payload as User;
                    console.log("current User: " + state.currentUser.firstName);
                    state.isLoggedIn = true;
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message!
                state.currentUser = null;
                state.isLoggedIn = false;
            })
    }
})

const usersReducer = usersSlice.reducer
export const { cleanUpUsersReducer, logout } = usersSlice.actions
export default usersReducer