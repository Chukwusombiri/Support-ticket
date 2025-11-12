import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const storedUser = JSON.parse(localStorage.getItem('authUser'));

const initialState = {
    authUser: storedUser ? storedUser : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
};


// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        const regUser = await authService.register(user);
        return regUser;
    } catch (error) {
        console.log(error);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || 'Failed to register';
        return thunkAPI.rejectWithValue(message);
    }
});

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);        
    } catch (error) {
        console.log(error);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || 'Failed to register';
        return thunkAPI.rejectWithValue(message);
    }
});

// Logout user
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        authService.logout();
    } catch (error) {
        const message = error.message || 'Failed to logout';
        return thunkAPI.rejectWithValue(message);
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.authUser = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.authUser = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.authUser = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.authUser = null;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.authUser = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.authUser = null;
            })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;