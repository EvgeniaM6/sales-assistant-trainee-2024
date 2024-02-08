import { useNavigate, useParams } from 'react-router-dom';
import { SideBar } from '../components';
import { PageRoutes } from '../constants';

function FeedPage() {
  const navigate = useNavigate();
  let { id } = useParams();

  const openFeedPage = () => {
    navigate(`/${PageRoutes.Feed}`);
  };

  return (
    <div className='page feed-page'>
      <SideBar />
      <div className='feed-page__main'>
        <h2>Feed page</h2>
        <button onClick={openFeedPage}>back</button>
        <h3>Feed {id}</h3>
      </div>
    </div>
  );
}

export default FeedPage;
