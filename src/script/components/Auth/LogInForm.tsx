import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AUTH_ERROR_RESP, PageRoutes } from '../../constants';
import { AuthFormValues, AuthResponseError } from '../../models';
import ErrorMessage from './ErrorMessage';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { useLogInMutation } from '../../redux/authApi';
import { ILoginRequestDTO } from '../../../public-common/interfaces/dto/auth/iadmin-login-request.interface';
import { setAccessToken, setIsAuthorized, setRefreshToken } from '../../store/authSlice';
import { IApiResponseDTO } from '../../../public-common/interfaces/dto/common/iapi-response.interface';
import { ILoginResponseDTO } from '../../../public-common/interfaces/dto/auth/ilogin-response.interfaces';
import { IAccountResponseDTO } from '../../../public-common/interfaces/dto/account/iaccount-response.interfaces';

function LogInForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logIn, { isSuccess, error, data, status, reset }] = useLogInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [errorAuth, setErrorAuth] = useState<string[]>([]);

  const login: SubmitHandler<AuthFormValues> = async (data) => {
    setIsCheckingAuth(true);
    setErrorAuth([]);
    const { login, password } = data;

    const logInData: ILoginRequestDTO = {
      email: login,
      password,
    };

    try {
      await logIn(logInData);
    } catch (error) {
      setErrorAuth([error as string]);
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    console.log('isSuccess=', isSuccess);
    console.log('error=', error);
    console.log('data=', data);
    console.log('status=', status);

    if (status === 'pending' || status === 'uninitialized') return;

    setIsCheckingAuth(false);

    if (!isSuccess && error) {
      if ('error' in error) {
        setErrorAuth([error.error]);
        return;
      }

      const errCode = (error as AuthResponseError).data?.error?.errorCode;
      console.log('errCode=', errCode);

      if (!((errCode || '') in AUTH_ERROR_RESP)) {
        setErrorAuth(['Opps! Something went wrong. Try again']);
      } else {
        const errorsInfo = (error as AuthResponseError).data.error?.filedsValidationErrors;
        setErrorAuth(AUTH_ERROR_RESP[errCode || ''](errorsInfo));
      }
      return;
    }

    const authData = (data as unknown as IApiResponseDTO).data as ILoginResponseDTO & IAccountResponseDTO;

    dispatch(setIsAuthorized(true));
    dispatch(setAccessToken(authData.access.accessToken || ''));
    dispatch(setRefreshToken(authData.access.refreshToken || ''));

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
          {...register('login', { required: 'Enter your login' })}
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
