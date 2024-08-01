import { configureStore } from '@reduxjs/toolkit';
import managementReducer from './features/managementSlice';
import documentsReducer from './features/documentsSlice';
import logosReducer from './features/logosSlice';
import newsReducer from './features/newsSlice';

export const store = configureStore({
  reducer: {
    management: managementReducer,
    documents: documentsReducer,
    logos: logosReducer,
    news: newsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});
