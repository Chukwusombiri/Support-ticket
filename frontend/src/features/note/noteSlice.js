import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';

const getUrl = (ticketId) => {
    return `/tickets/${ticketId}/notes`
}

export const getNotes = createAsyncThunk('/notes/getnotes', async (ticketId, thunkAPI) => {
    try {
        const url = getUrl(ticketId);
        return await noteService.getNotes(url)
    } catch (error) {
        console.error(error);
        const message = (error.response && error.response.data && error.response.data.message)
        ? error.response.data.message
        : error.message || error.toString();
        thunkAPI.rejectWithValue(message);
    }
})

export const createNote = createAsyncThunk('/notes/createNote', async (data, thunkAPI) => {
    try {
        const { ticketId, text } = data;
        const url = getUrl(ticketId);
        return await noteService.createNote(url, { text })
    } catch (error) {
        console.error(error);
        const message = (error.response && error.response.data && error.response.data.message)
            ? error.response.data.message
            : error.message || error.toString();
        thunkAPI.rejectWithValue(message);
    }
})

const initialState = {
    notes: [],
    note: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
}
const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => ({
            notes: [],
            note: null,
            isLoading: false,
            isError: false,
            isSuccess: false,
            message: null
        })
    },
    extraReducers: (builder) => {
        builder.addCase(getNotes.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.notes = action.payload;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.isSuccess = false;
            })
            .addCase(createNote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.notes.push(action.payload);
                state.note = action.payload;
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.isSuccess = false;
            })
    }
})

export default noteSlice.reducer;
export const { reset } = noteSlice.actions;