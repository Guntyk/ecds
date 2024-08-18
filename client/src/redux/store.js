import { configureStore } from '@reduxjs/toolkit';
import organizationsReducer from '@redux/features/organizationsSlice';
import managementReducer from '@redux/features/managementSlice';
import documentsReducer from '@redux/features/documentsSlice';
import partnersReducer from '@redux/features/partnersSlice';
import bannersReducer from '@redux/features/bannersSlice';
import eventsReducer from '@redux/features/eventsSlice';
import logosReducer from '@redux/features/logosSlice';
import newsReducer from '@redux/features/newsSlice';

export const store = configureStore({
  reducer: {
    organizations: organizationsReducer,
    management: managementReducer,
    documents: documentsReducer,
    partners: partnersReducer,
    banners: bannersReducer,
    events: eventsReducer,
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
