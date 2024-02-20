import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import { authApi } from '../redux/authApi';
import { feedsApi } from '../redux/feedsApi';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [feedsApi.reducerPath]: feedsApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat([authApi.middleware, feedsApi.middleware]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
