import { useNavigate, useParams } from 'react-router-dom';
import { SideBar } from '../components';

function FeedPage() {
  const navigate = useNavigate();
  let { id } = useParams();

  const openFeedPage = () => {
    navigate('/feed');
  };

  return (
    <div>
      <SideBar />
      <h2>Feed page</h2>
      <button onClick={openFeedPage}>back</button>
      <h3>Feed {id}</h3>
    </div>
  );
}

export default FeedPage;
