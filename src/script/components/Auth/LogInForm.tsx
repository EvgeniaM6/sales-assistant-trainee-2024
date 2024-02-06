import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../constants';

function LogInForm() {
  const navigate = useNavigate();

  const login: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate(`/${PageRoutes.Feed}`);
  };

  return (
    <div className='auth__block'>
      <h3 className='auth__title'>Log in</h3>
      <div className='auth__error'></div>
      <form onSubmit={login} className='auth__form auth-form'>
        <label htmlFor='login' className='auth__label'>Login</label>
        <input type='text' id='login' className='auth__input auth-form__item'/>
        <label htmlFor='password' className='auth__label'>Password</label>
        <input type='password' id='password' className='auth__input auth-form__item'/>
        <button type='submit' className='auth-form__item auth__btn'>Sign in</button>
      </form>
    </div>
  );
}

export default LogInForm;
