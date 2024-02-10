import { useParams } from 'react-router-dom';
import { Feed, Header, SideBar } from '../components';

function FeedPage() {
  const { id } = useParams();
  console.log('id=', id);

  return (
    <div className='page feed-page'>
      <SideBar />
      <div className='feed-page__main'>
        <Header />
        <Feed id={id || ''} />
      </div>
    </div>
  );
}

export default FeedPage;
