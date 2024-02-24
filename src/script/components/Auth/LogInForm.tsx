import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PageRoutes } from '../../constants';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { useLogInMutation } from '../../redux/authApi';
import { ILoginRequestDTO } from '../../../public-common/interfaces/dto/auth/iadmin-login-request.interface';
import { setIsAuthorized, setUserData } from '../../store/authSlice';
import { ILoginResponseDTO } from '../../../public-common/interfaces/dto/auth/ilogin-response.interfaces';
import { IAccountResponseDTO } from '../../../public-common/interfaces/dto/account/iaccount-response.interfaces';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { ThemeContext } from '../../../App';
import { getErrorsArr } from '../../utils';

function LogInForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logIn, { isSuccess, error, data, status, reset }] = useLogInMutation();
  const { theme } = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequestDTO>({ reValidateMode: 'onSubmit' });

  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [errorsArr, setErrorsArr] = useState<string[]>([]);

  const login: SubmitHandler<ILoginRequestDTO> = async (logInData) => {
    setIsCheckingAuth(true);
    setErrorsArr([]);
    await logIn(logInData);
  };

  useEffect(() => {
    if (status === QueryStatus.pending || status === QueryStatus.uninitialized) return;

    setIsCheckingAuth(false);

    if (!isSuccess && error) return;

    const authData = data?.data as ILoginResponseDTO & IAccountResponseDTO;

    localStorage.setItem('tokens', JSON.stringify(authData.access));

    dispatch(setIsAuthorized(true));
    dispatch(setUserData(authData.account));

    navigate(`/${PageRoutes.Feed}`);
    reset();
  }, [isSuccess, error, data, status]);

  useEffect(() => {
    const errorsArr: string[] = Object.values(errors).map((error) => error?.message?.toString() || '');

    if (error) {
      localStorage.removeItem('tokens');
      errorsArr.push(...getErrorsArr(error));
    }

    setErrorsArr(errorsArr);
  }, [errors, error]);

  return (
    <div className='auth__block'>
      <h3 className='auth__title'>Log in</h3>
      <ErrorMessage errorsArr={errorsArr} />
      <form onSubmit={handleSubmit(login)} className='auth__form auth-form'>
        <label htmlFor='login' className='auth__label'>Login</label>
        <input
          type='text'
          id='login'
          className={`auth__input auth-form__item ${theme}`}
          {...register('email', { required: 'Enter your login' })}
        />
        <label htmlFor='password' className='auth__label'>Password</label>
        <input
          type='password'
          id='password'
          className={`auth__input auth-form__item ${theme}`}
          {...register('password', { required: 'Enter your password' })}
        />
        <button type='submit' className={`auth-form__item auth__btn btn-secondary ${theme}`}>
          {isCheckingAuth && <span className='auth__btn-loading'></span>}
          <span>Sign in</span>
        </button>
      </form>
    </div>
  );
}

export default LogInForm;
