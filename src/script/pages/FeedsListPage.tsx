import { NavLink } from 'react-router-dom';
import { SideBar } from '../components';
import { PageRoutes } from '../constants';

function FeedsListPage() {
  const mockFeedsList = [1, 2, 3];

  return (
    <div>
      <SideBar />
      <h2>FeedsList page</h2>
      <h3>Feeds:</h3>
      {mockFeedsList.length && (
        <ul>
          {mockFeedsList.map((feed) => (
            <li key={feed}>
              <NavLink to={`/${PageRoutes.Feed}/${feed}`}>{feed}</NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FeedsListPage;
