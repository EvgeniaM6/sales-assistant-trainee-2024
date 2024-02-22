import { useContext } from 'react';
import { FieldErrors } from 'react-hook-form';
import { ILoginRequestDTO } from '../../../public-common/interfaces/dto/auth/iadmin-login-request.interface';
import errorImg from '../../../assets/images/error.svg';
import { ThemeContext } from '../../../App';

function ErrorMessage({ errors, errorAuth }: { errors: FieldErrors<ILoginRequestDTO>; errorAuth: string[] }) {
  const { theme } = useContext(ThemeContext);
  const errorsArr: string[] = Object.values(errors).map((error) => error?.message?.toString() || '');

  if (errorAuth.length) {
    errorsArr.push(...errorAuth);
  }

  return (
    <>
      {errorsArr.length > 0 && (
        <div className={`auth__error ${theme}`}>
          <>
            <div>
              <img src={errorImg} alt="error" />
            </div>
            <div>
              <p className='auth__error-paragraph'>Error</p>
              {errorsArr.map((errorMess) => (
                <p key={errorMess} className='auth__error-paragraph'>{errorMess}</p>
              ))}
            </div>
          </>
        </div>
      )}
    </>
  );
}

export default ErrorMessage;
