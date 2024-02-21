import { useContext } from 'react';
import { ThemeContext } from '../../../App';
import { PopupProps } from '../../models';

function Popup({ children, close, confirm, confirmAction }: PopupProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className='overlay'>
      <div className={`popup ${theme}`}>
        <div className='popup__content'>
          <div className='popup__cross'>
            <button className={`popup__cross-btn ${theme}`} onClick={close}>
              <span className={`popup__cross-btn-img ${theme}`}></span>
            </button>
          </div>
          {children}
          <div className='popup__btns'>
            <button className={`popup__btns-btn btn-secondary ${theme}`} onClick={close}>No, Keep it</button>
            <button className={`popup__btns-btn btn-primary ${theme}`} onClick={confirm}>
              {`Yes, ${confirmAction} it`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
