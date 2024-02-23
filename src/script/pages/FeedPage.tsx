import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Feed, Header, SideBar, Spin } from '../components';
import { ThemeContext } from '../../App';
import { useGetFeedByIdQuery } from '../redux/feedsApi';
import { getLocalStorageTokens } from '../utils';

function FeedPage() {
  const { id } = useParams();
  if (!id) return null;

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { theme } = useContext(ThemeContext);
  const { accessToken } = getLocalStorageTokens();

  const {
    data,
    isLoading,
  } = useGetFeedByIdQuery({ accessToken, id });

  const toggleOpenSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className='page feed-page'>
      <SideBar isOpen={isSideBarOpen} />
      <div className={`page__part${isSideBarOpen ? '-full' : ''} feed-page__main ${theme}`}>
        <Header isSideBarOpen={isSideBarOpen} toggleOpenSideBar={toggleOpenSideBar} />
        {isLoading && <Spin />}
        {data && !isLoading && <Feed data={data.data} />}
      </div>
    </div>
  );
}

export default FeedPage;
