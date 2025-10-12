import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
    tickets: [],
    ticket: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Create new ticket
export const createTicket = createAsyncThunk(
    'tickets/create',
    async (ticketData, thunkAPI) => {
        try {
            return await ticketService.createTicket(ticketData);
        } catch (error) {
            console.error(error);
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get user tickets
export const getTickets = createAsyncThunk(
    'tickets/getAll',
    async (_, thunkAPI) => {
        try {
            return await ticketService.getTickets();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get single ticket
export const getTicket = createAsyncThunk(
    'tickets/get',
    async (ticketId, thunkAPI) => {
        try {
            return await ticketService.getTicket(ticketId);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Close ticket
export const closeTicket = createAsyncThunk(
    'tickets/close',
    async (ticketId, thunkAPI) => {
        try {            
            return await ticketService.closeTicket(ticketId);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete ticket
export const deleteTicket = createAsyncThunk(
    'tickets/delete',
    async (ticketId, thunkAPI) => {
        try {           
            return await ticketService.deleteTicket(ticketId);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update ticket
export const updateTicket = createAsyncThunk(
    'tickets/update',
    async ({ ticketId, ticketData }, thunkAPI) => {
        try {            
            return await ticketService.updateTicket(ticketId, ticketData);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Ticket slice with reducers and extraReducers for async thunks
export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            }
            )
            .addCase(createTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets.push(action.payload);
                state.ticket = action.payload;
            }
            )
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }
            )
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true;
                state.tickets = [];
            }
            )
            .addCase(getTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets = action.payload;
            }
            )
            .addCase(getTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.tickets = [];
            }
            )
            .addCase(getTicket.pending, (state) => {
                state.isLoading = true;
                state.ticket = null;
            }
            )
            .addCase(getTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ticket = action.payload;
            }
            )
            .addCase(getTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.ticket = null;
            }
            )
            .addCase(closeTicket.pending, (state) => {
                state.isLoading = true;
            }
            )
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ticket.status = 'closed';
                state.tickets = state.tickets.map(ticket => ticket._id === action.payload._id ? action.payload : ticket);
            }
            )
            .addCase(closeTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }
            )
            .addCase(deleteTicket.pending, (state) => {
                state.isLoading = true;
            }
            )
            .addCase(deleteTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                state.tickets = state.tickets.filter(ticket => ticket._id !== action.payload.id);
            }
            )
            .addCase(deleteTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }
            )
            .addCase(updateTicket.pending, (state) => {
                state.isLoading = true;
            }
            )
            .addCase(updateTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ticket = action.payload;
                state.tickets = state.tickets.map(ticket => ticket._id === action.payload._id ? action.payload : ticket);
            }
            )
            .addCase(updateTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }
            )
    }
});

export const { reset } = ticketSlice.actions;

export default ticketSlice.reducer;