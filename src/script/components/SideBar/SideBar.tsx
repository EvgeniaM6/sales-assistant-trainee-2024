import { NavLink, useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../constants';
import { useState } from 'react';
import ChatItem from './ChatItem';
import { IChatItem } from '../../../public-common/interfaces/dto/chat/dto/ichat-item';

function SideBar() {
  const navigate = useNavigate();

  const mockChatsList = {
    "success": true,
    "statusCode": 200,
    "data": [
      {
        "accountId": 1,
        "id": 176,
        "name": "фівфівівфівф"
      },
      {
        "accountId": 1,
        "id": 159,
        "name": "\"The Simple Addition of Three Plus Three\""
      },
    ]
  };
  const [chatsList, setChatsList] = useState(mockChatsList.data);
  const [uniqueId, setUniqueId] = useState(2);

  const addNewChat = () => {
    const newChatsList = [...chatsList];
    newChatsList.push({
      accountId: 2,
      id: uniqueId,
      name: "new"
    });
    setUniqueId(uniqueId + 1)
    setChatsList(newChatsList);
  }

  const logout = () => {
    navigate(`/${PageRoutes.Auth}`);
  };

  const editChatItem = (id: number) => {
    console.log('editChatItem', id);
  };

  const deleteChatItem = (id: number) => {
    let chatIdToRedirect = 0;
    const newChatsList = chatsList.filter((chat, i) => {
      if (chat.id !== id) {
        return true;
      }
      chatIdToRedirect = i;
      return false;
    });
    console.log('chatIdToRedirect=', chatIdToRedirect);

    setChatsList(newChatsList);

    let nextChatItem: IChatItem | null = newChatsList[chatIdToRedirect];
    if (!nextChatItem) {
      nextChatItem = newChatsList[chatIdToRedirect - 1];
    }
    if (!nextChatItem) {
      nextChatItem = null;
    }

    console.log('nextChatItem=', nextChatItem);
    const redirectTo = nextChatItem ? `/${PageRoutes.Chat}/${nextChatItem.id}` : `/${PageRoutes.Feed}`
    console.log('redirectTo=', redirectTo);
    new Promise((res) => res('')).then(() => navigate(redirectTo));
  };

  return (
    <aside className='sidebar'>
      <div className='sidebar__main chats'>
        <button className='chats__new-btn' onClick={addNewChat}>
          <span className='chats__new-btn-icon'></span>
          <span className='chats__new-btn-text'>New chat</span>
        </button>
        {chatsList.length && (
          <ul className='chats__list'>
            {chatsList.map((chat) => (
              <ChatItem
                key={chat.id}
                id={chat.id}
                name={chat.name}
                deleteChatItem={deleteChatItem}
                editChatItem={editChatItem}
              />
            ))}
          </ul>
        )}
      </div>
      <div className='sidebar__footer'>
        <NavLink to={`/${PageRoutes.Feed}`} className='sidebar__footer-item feed-link'>
          <span className='feed-link__icon'></span>
          <span className='feed-link__text'>Upwork feed</span>
        </NavLink>
        <button onClick={logout} className='sidebar__footer-item logout-btn'>
          <span className='logout-btn__icon'></span>
          <span className='logout-btn__text'>logout</span>
          <span className='logout-btn__arrow'></span>
        </button>
      </div>
    </aside>
  );
  
}

export default SideBar;
