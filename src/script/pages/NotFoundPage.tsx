import { NavLink } from 'react-router-dom';
import { PageRoutes } from '../constants';
import { ThemeContext } from '../../App';
import { useContext } from 'react';

function NotFoundPage() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`page not-found-page ${theme}`}>
      <div className='not-found'>
        <h1>Oops!</h1>
        <h2>404 - Page not found</h2>
        <p>The page you are looking for might have been removed, had its name changed or is temporarily unavailable</p>
        <NavLink to={`/${PageRoutes.Feed}`} className={`not-found__link btn-secondary ${theme}`}>
          Go to home page
        </NavLink>
      </div>
    </div>
  );
}

export default NotFoundPage;
