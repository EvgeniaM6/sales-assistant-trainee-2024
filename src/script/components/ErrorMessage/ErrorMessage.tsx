import { useContext } from 'react';
import errorImg from '../../../assets/images/error.svg';
import { ThemeContext } from '../../../App';

function ErrorMessage({ errorsArr }: { errorsArr: string[] }) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {errorsArr.length > 0 && (
        <div className={`error ${theme}`}>
          <>
            <div>
              <img src={errorImg} alt='error' />
            </div>
            <div>
              <p className='error-paragraph'>Error</p>
              {errorsArr.map((errorMess) => (
                <p key={errorMess} className='error-paragraph'>{errorMess}</p>
              ))}
            </div>
          </>
        </div>
      )}
    </>
  );
}

export default ErrorMessage;
