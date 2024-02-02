import { NavLink, useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../constants';

function SideBar() {
  const navigate = useNavigate();

  const mockChatsList = [1, 2, 3];
  
  const logout = () => {
    navigate(`/${PageRoutes.Auth}`);
  };

  return (
    <aside>
      <h2>SideBar</h2>
      <h3>Chats:</h3>
      {mockChatsList.length && (
        <ul>
          {mockChatsList.map((chat) => (
            <li key={chat}>
              <NavLink to={`/${PageRoutes.Chat}/${chat}`}>{chat}</NavLink>
            </li>
          ))}
        </ul>
      )}
      <NavLink to={`/${PageRoutes.Feed}`}>Upwork feed</NavLink>
      <button onClick={logout}>logout</button>
      <hr />
    </aside>
  );
  
}

export default SideBar;
