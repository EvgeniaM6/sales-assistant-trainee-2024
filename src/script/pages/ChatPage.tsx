import { useParams } from 'react-router-dom';
import { SideBar } from '../components';

function ChatPage() {
  let { id } = useParams();

  return (
    <div>
      <SideBar />
      <h2>Chat page</h2>
      <h3>Chat {id}</h3>
    </div>
  );
}

export default ChatPage;
