import { configureStore } from '@reduxjs/toolkit';
import aboutUsReducer from './features/aboutUsSlice';

export const store = configureStore({
  reducer: {
    aboutUs: aboutUsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});
