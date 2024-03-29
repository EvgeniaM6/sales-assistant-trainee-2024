import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../models';
import { IAccountDTO } from '../../public-common/interfaces/dto/account/iaccount.interface';

const initialState: AuthState = {
  isAuthorized: false,
  isLoadingRecoverUser: true,
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthorized(state, action: PayloadAction<boolean>) {
      return { ...state, isAuthorized: action.payload };
    },
    setIsLoadingRecoverUser(state, action: PayloadAction<boolean>) {
      return { ...state, isLoadingRecoverUser: action.payload };
    },
    setUserData(state, action: PayloadAction<IAccountDTO>) {
      return { ...state, userData: action.payload };
    },
    logOut(state) {
      return { ...state, isAuthorized: false, userData: null };
    },
  },
});

export const { setIsAuthorized, setIsLoadingRecoverUser, setUserData, logOut } = authSlice.actions;
export default authSlice.reducer;
