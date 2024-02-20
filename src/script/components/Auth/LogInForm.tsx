import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AUTH_ERROR_RESP, PageRoutes } from '../../constants';
import { AuthResponseError } from '../../models';
import ErrorMessage from './ErrorMessage';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { useLogInMutation } from '../../redux/authApi';
import { ILoginRequestDTO } from '../../../public-common/interfaces/dto/auth/iadmin-login-request.interface';
import { setIsAuthorized, setUserData } from '../../store/authSlice';
import { ILoginResponseDTO } from '../../../public-common/interfaces/dto/auth/ilogin-response.interfaces';
import { IAccountResponseDTO } from '../../../public-common/interfaces/dto/account/iaccount-response.interfaces';
import { QueryStatus } from '@reduxjs/toolkit/query';

function LogInForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logIn, { isSuccess, error, data, status, reset }] = useLogInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequestDTO>({ reValidateMode: 'onSubmit' });

  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [errorAuth, setErrorAuth] = useState<string[]>([]);

  const login: SubmitHandler<ILoginRequestDTO> = async (logInData) => {
    setIsCheckingAuth(true);
    setErrorAuth([]);
    await logIn(logInData);
  };

  useEffect(() => {
    if (status === QueryStatus.pending || status === QueryStatus.uninitialized) return;

    setIsCheckingAuth(false);

    if (!isSuccess && error) {
      localStorage.removeItem('tokens');

      if ('error' in error) {
        setErrorAuth([error.error]);
        return;
      }

      const errCode = (error as AuthResponseError).data?.error?.errorCode || '';

      if (errCode in AUTH_ERROR_RESP) {
        const errorsInfo = (error as AuthResponseError).data.error?.filedsValidationErrors;
        setErrorAuth(AUTH_ERROR_RESP[errCode](errorsInfo));
      } else {
        setErrorAuth(['Oops! Something went wrong. Try again']);
      }
      return;
    }

    const authData = data?.data as ILoginResponseDTO & IAccountResponseDTO;

    localStorage.setItem('tokens', JSON.stringify(authData.access));

    dispatch(setIsAuthorized(true));
    dispatch(setUserData(authData.account));

    navigate(`/${PageRoutes.Feed}`);
    reset();
  }, [isSuccess, error, data, status]);

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
          {...register('email', { required: 'Enter your login' })}
        />
        <label htmlFor='password' className='auth__label'>Password</label>
        <input
          type='password'
          id='password'
          className='auth__input auth-form__item'
          {...register('password', { required: 'Enter your password' })}
        />
        <button type='submit' className='auth-form__item auth__btn btn-secondary'>
          {isCheckingAuth && <span className='auth__btn-loading'></span>}
          <span>Sign in</span>
        </button>
      </form>
    </div>
  );
}

export default LogInForm;
