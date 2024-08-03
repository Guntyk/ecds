import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import EventsService from 'services/EventsService';

const initialState = {
  events: [],
  error: null,
  isLoading: false,
};

export const getEvents = createAsyncThunk('events/getEvents', async (_, { rejectWithValue }) => {
  const { result, error } = await EventsService.getEvents();

  if (result?.data) {
    return result.data;
  }

  return rejectWithValue(error || 'An error occurred while getting events data. Please try again later');
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
        state.error = null;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.events = [];
        state.error = action.payload;
      });
  },
});

export default eventsSlice.reducer;
export const { actions } = eventsSlice;
