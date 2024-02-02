import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const navigate = useNavigate();

  const login = () => {
    navigate('/feed');
  };

  return (
    <div>
      <h2>Auth page</h2>
      <button onClick={login}>login</button>
    </div>
  );
}

export default AuthPage;
