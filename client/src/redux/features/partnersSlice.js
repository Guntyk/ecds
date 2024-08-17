import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AboutUsService from 'services/StaticDataService';

const initialState = {
  partners: [],
  error: null,
  isLoading: false,
};

export const getPartners = createAsyncThunk('partners/getPartners', async (_, { rejectWithValue }) => {
  const { result, error } = await AboutUsService.getPartners();

  if (result?.data) {
    return result.data;
  }

  return rejectWithValue(error || 'An error occurred while getting partners data. Please try again later');
});

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPartners.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPartners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.partners = action.payload;
        state.error = null;
      })
      .addCase(getPartners.rejected, (state, action) => {
        state.isLoading = false;
        state.partners = [];
        state.error = action.payload;
      });
  },
});

export const { resetError } = partnersSlice.actions;
export default partnersSlice.reducer;
