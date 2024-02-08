import { useParams } from 'react-router-dom';
import { SideBar } from '../components';

function ChatPage() {
  let { id } = useParams();

  return (
    <div className='page chat-page'>
      <SideBar />
      <div className='chat-page__main'>
        <h2>Chat page</h2>
        <h3>Chat {id}</h3>
      </div>
    </div>
  );
}

export default ChatPage;
