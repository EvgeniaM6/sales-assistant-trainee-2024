import { NavLink } from 'react-router-dom';
import { IUpworkFeedItemDTO } from '../../../public-common/interfaces/dto/upwork-feed/iupwork-feed-item.dto';
import { PageRoutes } from '../../constants';

function FeedsTable({ mockFeedsList }: { mockFeedsList: IUpworkFeedItemDTO[] }) {
  return (
    <>
      {mockFeedsList.length && (
        <ul>
          {mockFeedsList.map((feed) => (
            <li key={feed.id}>
              <NavLink to={`/${PageRoutes.Feed}/${feed.id}`}>{feed.title}</NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default FeedsTable;
