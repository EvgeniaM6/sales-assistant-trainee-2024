import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAccessDTO } from '../../public-common/interfaces/dto/auth/iaccess.interface';
import { useRecoverUserQuery } from '../redux/authApi';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { logOut, setIsAuthorized, setIsLoadingRecoverUser, setUserData } from '../store/authSlice';
import { getLocalStorageTokens } from '../utils';
import { PageRoutes } from '../constants';

function useRecoverUser() {
  const navigate = useNavigate();
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
    if (e.key === 'tokens') {
      if (e.newValue === null) {
        dispatch(logOut());
      } else {
        navigate(`/${PageRoutes.Feed}`);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  return { isLoadingRecoverUser };
}

export default useRecoverUser;
