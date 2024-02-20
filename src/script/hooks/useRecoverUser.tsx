import { useEffect } from 'react';
import { IAccessDTO } from '../../public-common/interfaces/dto/auth/iaccess.interface';
import { useRecoverUserQuery } from '../redux/authApi';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { logOut, setIsAuthorized, setIsLoadingRecoverUser, setUserData } from '../store/authSlice';
import { getLocalStorageTokens } from '../utils';

function useRecoverUser() {
  const dispatch = useAppDispatch();
  const { isLoadingRecoverUser } = useAppSelector((store) => store.auth);
  const { accessToken }: IAccessDTO = getLocalStorageTokens();

  const {
    data,
    error,
    isError,
    isLoading,
  } = useRecoverUserQuery({ accessToken });

  useEffect(() => {
    if (isLoading) return;

    if (data) {
      dispatch(setIsAuthorized(true));
      dispatch(setUserData(data.data.account));
    }

    dispatch(setIsLoadingRecoverUser(false));
  }, [isLoading, data, error, isError]);

  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === 'tokens' && e.newValue === null) {
      dispatch(logOut());
    }
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  return { isLoadingRecoverUser };
}

export default useRecoverUser;
