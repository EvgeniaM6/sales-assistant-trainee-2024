import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../constants';
import { useAuth } from '../hooks';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { isAuthorized } = useAuth();

  useEffect(() => {
    if (!isAuthorized) {
      navigate(`/${PageRoutes.Auth}`);
    }
  }, [isAuthorized]);

  return isAuthorized ? children : null;
};

export default PrivateRoute;
