import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthBlock } from '../components';
import { useAuth } from '../hooks';
import { PageRoutes } from '../constants';

function AuthPage() {
  const navigate = useNavigate();
  const { isAuthorized } = useAuth();

  useEffect(() => {
    if (isAuthorized) {
      navigate(`/${PageRoutes.Feed}`);
    }
  }, []);

  return (
    <div className='page auth-page'>
      <AuthBlock />
      <div className='auth-page__background'></div>
    </div>
  );
}

export default AuthPage;
