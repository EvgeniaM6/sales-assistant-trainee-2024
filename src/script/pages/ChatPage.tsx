import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chat, Header, SideBar, Spin } from '../components';
import { ThemeContext } from '../../App';
import { getLocalStorageTokens } from '../utils';
import { useGetMessagesByChatIdQuery } from '../redux/messageApi';

function ChatPage() {
  const { id } = useParams();
  if (!id) return null;

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { theme } = useContext(ThemeContext);

  const { accessToken } = getLocalStorageTokens();
  const {
    data,
    isLoading,
    isFetching,
  } = useGetMessagesByChatIdQuery({ accessToken, id });

  const toggleOpenSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className='page chat-page'>
      <SideBar isOpen={isSideBarOpen} />
      <div className={`page__part${isSideBarOpen ? '-full' : ''} chat-page__main ${theme}`}>
        <Header isSideBarOpen={isSideBarOpen} toggleOpenSideBar={toggleOpenSideBar} />
        {(isLoading || isFetching) && <Spin />}
        {data && !isLoading && !isFetching && <Chat messagesArr={data.data} />}
      </div>
    </div>
  );
}

export default ChatPage;
