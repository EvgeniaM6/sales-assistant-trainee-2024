import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PageRoutes } from '../../constants';
import { AuthFormValues } from '../../models';
import ErrorMessage from './ErrorMessage';
import { useState } from 'react';
import { mockFetch } from './mockFetch';

function LogInForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [errorAuth, setErrorAuth] = useState('');

  const login: SubmitHandler<AuthFormValues> = async (data) => {
    setIsCheckingAuth(true);
    setErrorAuth('');
    const { login, password } = data;

    try {
      await mockFetch(login, password);
      navigate(`/${PageRoutes.Feed}`);
    } catch (error) {
      console.log(error);
      setErrorAuth(error as string);
      setIsCheckingAuth(false);
    }
  };

  return (
    <div className='auth__block'>
      <h3 className='auth__title'>Log in</h3>
      <ErrorMessage errors={errors} errorAuth={errorAuth} />
      <form onSubmit={handleSubmit(login)} className='auth__form auth-form'>
        <label htmlFor='login' className='auth__label'>Login</label>
        <input
          type='text'
          id='login'
          className='auth__input auth-form__item'
          {...register('login', { required: 'Enter your login' })}
        />
        <label htmlFor='password' className='auth__label'>Password</label>
        <input 
          type='password'
          id='password'
          className='auth__input auth-form__item'
          {...register('password', { required: 'Enter your password' })}
        />
        <button type='submit' className='auth-form__item auth__btn'>
          {isCheckingAuth && <span className='auth__btn-loading'></span>}
          <span>Sign in</span>
        </button>
      </form>
    </div>
  );
}

export default LogInForm;
