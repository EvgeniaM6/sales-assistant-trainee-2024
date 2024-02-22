import { useContext } from 'react';
import { ThemeContext } from '../../../App';

function Header({ isSideBarOpen, toggleOpenSideBar }: {
  isSideBarOpen: boolean;
  toggleOpenSideBar: () => void;
}) {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (): void => {
    if (!setTheme) return;

    if (!theme) {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      localStorage.removeItem('theme');
      setTheme('');
    }
  };

  return (
    <header className='header'>
      <div className='header__item'>
        <button className={`header__btn ${theme}`} onClick={toggleOpenSideBar}>
          <span className={`header__btn-img ${isSideBarOpen ? 'collapse' : 'open'} ${theme}`}></span>
        </button>
      </div>
      <div className='header__item'>
        <button className={`header__btn ${theme}`} onClick={toggleTheme}>
          <span className={`header__btn-img theme ${theme}`}></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
