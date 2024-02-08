import { NavLink } from 'react-router-dom';
import { PageRoutes } from '../constants';

function NotFoundPage() {
  return (
    <div className='page not-found-page'>
      <div className="not-found">
        <h1>Oops!</h1>
        <h2>404 - Page not found</h2>
        <p>The page you are looking for might have been removed, had its name changed or is temporarily unavailable</p>
        <NavLink to={`/${PageRoutes.Feed}`} className='not-found__link'>
          Go to home page
        </NavLink>
      </div>
    </div>
  );
}

export default NotFoundPage;
