import { configureStore } from '@reduxjs/toolkit';
import managementReducer from './features/managementSlice';
import logosReducer from './features/logosSlice';

export const store = configureStore({
  reducer: {
    management: managementReducer,
    logos: logosReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});
