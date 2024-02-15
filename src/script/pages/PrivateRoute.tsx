import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRefreshTokenMutation } from '../redux/authApi';
import { ILoginResponseDTO } from '../../public-common/interfaces/dto/auth/ilogin-response.interfaces';
import { IAccessDTO } from '../../public-common/interfaces/dto/auth/iaccess.interface';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setAccessToken, setIsAuthorized, setRefreshToken } from '../store/authSlice';
import { PageRoutes } from '../constants';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [refreshUserToken, { isSuccess, error, data, status }] = useRefreshTokenMutation();

  const { refreshToken } = useAppSelector((store) => store.auth);

  const access: IAccessDTO | null = JSON.parse(localStorage.getItem('tokens') || 'null');

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    refreshUserToken({ token: access?.refreshToken || '' });
  }, []);

  const saveRefreshToken = () => {
    const tokenAccess: IAccessDTO | null = access ? { ...access, refreshToken } : null;
    localStorage.setItem('tokens', JSON.stringify(tokenAccess));
  };

  useEffect(() => {
    window.addEventListener('beforeunload', saveRefreshToken);

    return () => {
      saveRefreshToken();
      window.removeEventListener('beforeunload', saveRefreshToken);
    };
  });

  useEffect(() => {
    if (status === 'pending' || status === 'uninitialized') return;

    if (!isSuccess) {
      navigate(`/${PageRoutes.Auth}`);
      dispatch(setIsAuthorized(false));
      dispatch(setAccessToken(''));
      dispatch(setRefreshToken(''));
      localStorage.setItem('tokens', '');
    } else {
      setIsAuthenticated(true);

      const { access } = data?.data as ILoginResponseDTO;
      dispatch(setIsAuthorized(true));
      dispatch(setAccessToken(access.accessToken || ''));
      dispatch(setRefreshToken(access.refreshToken || ''));
      localStorage.setItem('tokens', JSON.stringify(access));
    }
  }, [isSuccess, error, data, status]);

  if (isAuthenticated) {
    return (
      <>
        {children}
      </>
    );
  } else {
    return null;
  }
};

export default PrivateRoute;
