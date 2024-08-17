import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import StaticDataService from 'services/StaticDataService';

const initialState = {
  banners: [],
  error: null,
  isLoading: false,
};

export const getBanners = createAsyncThunk('banners/getBanners', async (_, { rejectWithValue }) => {
  const { result, error } = await StaticDataService.getBanners();

  if (result?.data) {
    return result.data;
  }

  return rejectWithValue(error || 'An error occurred while getting banners data. Please try again later');
});

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBanners.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.banners = action.payload;
        state.error = null;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.banners = [];
        state.error = action.payload;
      });
  },
});

export default bannersSlice.reducer;
