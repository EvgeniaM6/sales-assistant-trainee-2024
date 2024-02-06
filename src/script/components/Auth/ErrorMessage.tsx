import { FieldErrors } from 'react-hook-form';
import { AuthFormValues } from '../../models';
import errorImg from '../../../assets/images/error.svg';

function ErrorMessage({ errors }: { errors: FieldErrors<AuthFormValues> }) {
  const errorsArr: string[] = Object.values(errors).map((error) => error?.message?.toString() || '');

  return (
    <>
      {errorsArr.length > 0 && (
        <div className='auth__error'>
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
