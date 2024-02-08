import { NavLink } from 'react-router-dom';
import { PageRoutes } from '../../constants';

const mockFeedsList = [1, 2, 3];

function FeedsBlock() {
  return (
    <main className='feeds-list-page__main feeds'>
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
    </main>
  );
}

export default FeedsBlock;
