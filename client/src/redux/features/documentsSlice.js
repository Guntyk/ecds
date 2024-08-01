import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AboutUsService from 'services/AboutUsService';

const initialState = {
  documents: [],
  error: null,
  isLoading: false,
};

export const getDocuments = createAsyncThunk('documents/getDocuments', async (_, { rejectWithValue }) => {
  const { result, error } = await AboutUsService.getDocuments();

  if (result?.data) {
    return result.data;
  }

  return rejectWithValue(error || 'An error occurred while getting documents data. Please try again later');
});

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDocuments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents = action.payload;
        state.error = null;
      })
      .addCase(getDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.documents = [];
        state.error = action.payload;
      });
  },
});

export default documentsSlice.reducer;
export const { actions } = documentsSlice;
