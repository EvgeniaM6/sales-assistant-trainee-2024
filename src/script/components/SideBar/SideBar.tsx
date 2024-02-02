import { NavLink, useNavigate } from 'react-router-dom';

function SideBar() {
  const navigate = useNavigate();

  const mockChatsList = [1, 2, 3];
  
  const logout = () => {
    navigate('/auth');
  };

  return (
    <aside>
      <h2>SideBar</h2>
      <h3>Chats:</h3>
      {mockChatsList.length && (
        <ul>
          {mockChatsList.map((chat) => (
            <li key={chat}>
              <NavLink to={`/chat/${chat}`}>{chat}</NavLink>
            </li>
          ))}
        </ul>
      )}
      <NavLink to={'/feed'}>Upwork feed</NavLink>
      <button onClick={logout}>logout</button>
      <hr />
    </aside>
  );
  
}

export default SideBar;
