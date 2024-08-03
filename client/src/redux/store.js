import { configureStore } from '@reduxjs/toolkit';
import organizationsReducer from './features/organizationsSlice';
import managementReducer from './features/managementSlice';
import documentsReducer from './features/documentsSlice';
import partnersReducer from './features/partnersSlice';
import eventsReducer from './features/eventsSlice';
import logosReducer from './features/logosSlice';
import newsReducer from './features/newsSlice';

export const store = configureStore({
  reducer: {
    organizations: organizationsReducer,
    management: managementReducer,
    documents: documentsReducer,
    partners: partnersReducer,
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
