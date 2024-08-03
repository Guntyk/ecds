import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AboutUsService from 'services/AboutUsService';

const initialState = {
  organizations: [],
  error: null,
  isLoading: false,
};

export const getOrganizations = createAsyncThunk('organizations/getOrganizations', async (_, { rejectWithValue }) => {
  const { result, error } = await AboutUsService.getOrganizations();

  if (result?.data) {
    return result.data;
  }

  return rejectWithValue(error || 'An error occurred while getting organizations data. Please try again later');
});

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrganizations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.organizations = action.payload;
        state.error = null;
      })
      .addCase(getOrganizations.rejected, (state, action) => {
        state.isLoading = false;
        state.organizations = [];
        state.error = action.payload;
      });
  },
});

export default organizationsSlice.reducer;
export const { actions } = organizationsSlice;
