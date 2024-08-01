import { configureStore } from '@reduxjs/toolkit';
import managementReducer from './features/managementSlice';

export const store = configureStore({
  reducer: {
    management: managementReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});
