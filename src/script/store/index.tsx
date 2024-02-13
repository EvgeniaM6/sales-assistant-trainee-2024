import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import { authApi } from '../redux/authApi';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat([authApi.middleware]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
