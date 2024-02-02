import { NavLink } from 'react-router-dom';
import { PageRoutes } from '../constants';

function NotFoundPage() {
  return (
    <div>
      <h2>NotFound page</h2>
      <NavLink to={`/${PageRoutes.Feed}`}>Go To home Page</NavLink>
    </div>
  );
}

export default NotFoundPage;
