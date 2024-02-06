import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PageRoutes } from '../../constants';
import { AuthFormValues } from '../../models';
import ErrorMessage from './ErrorMessage';

function LogInForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const login: SubmitHandler<AuthFormValues> = (data) => {
    const { login, password } = data;
    console.log('login=', login);
    console.log('password=', password);

    navigate(`/${PageRoutes.Feed}`);
  };

  return (
    <div className='auth__block'>
      <h3 className='auth__title'>Log in</h3>
      <ErrorMessage errors={errors} />
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
        <button type='submit' className='auth-form__item auth__btn'>Sign in</button>
      </form>
    </div>
  );
}

export default LogInForm;
