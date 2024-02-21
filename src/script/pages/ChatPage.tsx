import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chat, Header, SideBar } from '../components';
import { ThemeContext } from '../../App';

function ChatPage() {
  const { id } = useParams();
  console.log('id=', id);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { theme } = useContext(ThemeContext);

  const toggleOpenSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className='page chat-page'>
      <SideBar isOpen={isSideBarOpen} />
      <div className={`page__part${isSideBarOpen ? '-full' : ''} chat-page__main ${theme}`}>
        <Header isSideBarOpen={isSideBarOpen} toggleOpenSideBar={toggleOpenSideBar} />
        <Chat />
      </div>
    </div>
  );
}

export default ChatPage;
