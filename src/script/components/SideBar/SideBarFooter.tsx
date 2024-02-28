import { useContext, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PageRoutes } from '../../constants';
import { ThemeContext } from '../../../App';
import { PopupTooltip } from '../Popup';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOut } from '../../store/authSlice';

function SideBarFooter() {
  const dispatch = useAppDispatch();

  const { theme } = useContext(ThemeContext);
  const { userData } = useAppSelector((store) => store.auth);
  const [isShowLogout, setIsShowLogout] = useState(false);

  const referenceElement = useRef<HTMLButtonElement | null>(null);

  const openLogout = () => {
    setIsShowLogout(true);
  };

  const hideLogout = () => {
    setIsShowLogout(false);
  };

  const logout = () => {
    dispatch(logOut());
    localStorage.removeItem('tokens');
  };

  return (
    <div className='sidebar__footer'>
      <div className='sidebar__footer-item'>
        <NavLink
          to={`/${PageRoutes.Feed}`}
          className={() => {
            const isActive = location.pathname === '/' || location.pathname === `/${PageRoutes.Feed}`;
            return `sidebar__footer-btn feed-link ${theme} ${isActive ? ' active' : ''}`;
          }}
        >
          <span className={`feed-link__icon ${theme}`}></span>
          <span className='feed-link__text'>Upwork feed</span>
        </NavLink>
      </div>
      <div className='sidebar__footer-item'>
        <button onClick={openLogout} className={`sidebar__footer-btn logout-btn ${theme}`} ref={referenceElement}>
          <span className={`logout-btn__icon ${theme}`}></span>
          <span className='logout-btn__text'>{userData?.email || 'user'}</span>
          <span className={`logout-btn__arrow ${theme}`}></span>
        </button>
        {isShowLogout && (
          <PopupTooltip close={hideLogout} refElem={referenceElement}>
            <button className={`popup__btn ${theme}`} onClick={logout}>
              <span className={`popup__btn-icon popup__btn-logout ${theme}`}></span>
              <span>Logout</span>
            </button>
          </PopupTooltip>
        )}
      </div>
    </div>
  );
}

export default SideBarFooter;
