import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Feed, Header, SideBar } from '../components';

function FeedPage() {
  const { id } = useParams();
  console.log('id=', id);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const toggleOpenSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className='page feed-page'>
      <SideBar isOpen={isSideBarOpen} />
      <div className={`page__part${isSideBarOpen ? '-full' : ''} feed-page__main`}>
        <Header isSideBarOpen={isSideBarOpen} toggleOpenSideBar={toggleOpenSideBar} />
        <Feed id={id || ''} />
      </div>
    </div>
  );
}

export default FeedPage;
