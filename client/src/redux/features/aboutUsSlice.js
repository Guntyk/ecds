import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  isLoading: false,
};

const aboutUsSlice = createSlice({
  name: 'aboutUs',
  initialState,
});

export default aboutUsSlice.reducer;
export const { actions } = aboutUsSlice;
