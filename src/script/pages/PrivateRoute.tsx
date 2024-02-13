import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRefreshTokenMutation } from '../redux/authApi';
import { ILoginResponseDTO } from '../../public-common/interfaces/dto/auth/ilogin-response.interfaces';
import { useAppDispatch } from '../hooks';
import { setAccessToken, setIsAuthorized, setRefreshToken } from '../store/authSlice';
import { PageRoutes } from '../constants';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  console.log('render PrivateRoute');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [refreshUserToken, { isSuccess, error, data, status }] = useRefreshTokenMutation();

  const access = JSON.parse(localStorage.getItem('tokens') || 'null');
  console.log('access=', access);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    refreshUserToken({ token: access?.refreshToken || '' });
  }, []);

  useEffect(() => {
    console.log('useEffect, [isSuccess, error, data, status]');

    console.log('isSuccess=', isSuccess);
    console.log('error=', error);
    console.log('data=', data);
    console.log('status=', status);

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
