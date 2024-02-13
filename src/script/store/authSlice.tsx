import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../models';

const initialState: AuthState = {
  isAuthorized: false,
  accessToken: '',
  refreshToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthorized(state, action: PayloadAction<boolean>) {
      return { ...state, isAuthorized: action.payload };
    },
    setAccessToken(state, action: PayloadAction<string>) {
      return { ...state, accessToken: action.payload };
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      return { ...state, refreshToken: action.payload };
    },
  },
});

export const { setIsAuthorized, setAccessToken, setRefreshToken } = authSlice.actions;
export default authSlice.reducer;
