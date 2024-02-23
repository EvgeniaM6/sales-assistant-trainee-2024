import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import { authApi } from '../redux/authApi';
import { feedsApi } from '../redux/feedsApi';
import feedsSlice from './feedsSlice';
import { chatApi } from '../redux/chatApi';
import { messageApi } from '../redux/messageApi';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [feedsApi.reducerPath]: feedsApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    auth: authSlice,
    feeds: feedsSlice,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat([
    authApi.middleware,
    feedsApi.middleware,
    chatApi.middleware,
    messageApi.middleware,
  ]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
