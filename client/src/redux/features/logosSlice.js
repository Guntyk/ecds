import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AboutUsService from 'services/StaticDataService';

const initialState = {
  logos: [],
  error: null,
  isLoading: false,
};

export const getLogos = createAsyncThunk('logos/getLogos', async (_, { rejectWithValue }) => {
  const { result, error } = await AboutUsService.getLogos();

  if (result?.data) {
    return result.data;
  }

  return rejectWithValue(error || 'An error occurred while getting logos data. Please try again later');
});

const logosSlice = createSlice({
  name: 'logos',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLogos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLogos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logos = action.payload;
        state.error = null;
      })
      .addCase(getLogos.rejected, (state, action) => {
        state.isLoading = false;
        state.logos = [];
        state.error = action.payload;
      });
  },
});

export default logosSlice.reducer;
export const { actions } = logosSlice;
