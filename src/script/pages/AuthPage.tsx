import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../constants';

function AuthPage() {
  const navigate = useNavigate();

  const login = () => {
    navigate(`/${PageRoutes.Feed}`);
  };

  return (
    <div>
      <h2>Auth page</h2>
      <button onClick={login}>login</button>
    </div>
  );
}

export default AuthPage;
