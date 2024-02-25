import { useContext } from 'react';
import errorImg from '../../../assets/images/error.svg';
import { ThemeContext } from '../../../App';

function ErrorMessage({ errorMsg }: { errorMsg: string }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`error ${theme}`}>
      <>
        <div>
          <img src={errorImg} alt='error' />
        </div>
        <div>
          <p className='error-paragraph'>Error</p>
          <p key={errorMsg} className='error-paragraph'>{errorMsg}</p>
        </div>
      </>
    </div>
  );
}

export default ErrorMessage;
