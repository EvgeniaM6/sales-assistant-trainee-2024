import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header, SideBar } from '../components';

function ChatPage() {
  const { id } = useParams();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const toggleOpenSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className='page chat-page'>
      <SideBar isOpen={isSideBarOpen} />
      <div className={`page__part${isSideBarOpen ? '-full' : ''} chat-page__main`}>
        <Header isSideBarOpen={isSideBarOpen} toggleOpenSideBar={toggleOpenSideBar} />
        <h2>Chat page</h2>
        <h3>Chat {id}</h3>
      </div>
    </div>
  );
}

export default ChatPage;
