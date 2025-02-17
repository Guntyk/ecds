import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AboutUsService from 'services/StaticDataService';

const initialState = {
  management: [],
  error: null,
  isLoading: false,
};

export const getManagement = createAsyncThunk('management/getManagers', async (_, { rejectWithValue }) => {
  const { result, error } = await AboutUsService.getManagement();

  if (result?.data) {
    return result.data;
  }

  return rejectWithValue(error || 'An error occurred while getting management data. Please try again later');
});

const managementSlice = createSlice({
  name: 'management',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getManagement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getManagement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.management = action.payload;
        state.error = null;
      })
      .addCase(getManagement.rejected, (state, action) => {
        state.isLoading = false;
        state.management = [];
        state.error = action.payload;
      });
  },
});

export default managementSlice.reducer;
