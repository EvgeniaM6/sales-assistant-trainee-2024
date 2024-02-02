import { NavLink } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      <h2>NotFound page</h2>
      <NavLink to='/feed'>Go To home Page</NavLink>
    </div>
  );
}

export default NotFoundPage;
