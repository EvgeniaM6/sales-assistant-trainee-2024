import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IChatItem } from '../../../public-common/interfaces/dto/chat/dto/ichat-item';
import { PageRoutes } from '../../constants';
import ChatItem from './ChatItem';
import CreateChatPopper from './CreateChatPopper';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOut } from '../../store/authSlice';
import { mockChatsList } from './mockChatsList';
import { PopupTooltip } from '../Popup';

function SideBar({ isOpen }: { isOpen: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((store) => store.auth);

  const [chatsList, setChatsList] = useState(mockChatsList.data);
  const [uniqueId, setUniqueId] = useState(mockChatsList.data.length);
  const [isCreating, setIsCreating] = useState(false);
  const [isShowLogout, setIsShowLogout] = useState(false);

  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);

  const openLogout = () => {
    setIsShowLogout(true);
  };

  const hideLogout = () => {
    setIsShowLogout(false);
  };

  const openCreating = () => setIsCreating(true);
  const closeCreating = () => setIsCreating(false);
  const addNewChat = (name: string) => {
    const newChatsList = [...chatsList];
    newChatsList.push({
      accountId: 2,
      id: uniqueId,
      name: name,
    });
    setUniqueId(uniqueId + 1);
    setChatsList(newChatsList);
  };

  const logout = () => {
    dispatch(logOut());
    localStorage.setItem('tokens', '');
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

    setChatsList(newChatsList);

    let nextChatItem: IChatItem | null = newChatsList[chatIdToRedirect];
    if (!nextChatItem) {
      nextChatItem = newChatsList[chatIdToRedirect - 1];
    }
    if (!nextChatItem) {
      nextChatItem = null;
    }

    const redirectTo = nextChatItem ? `/${PageRoutes.Chat}/${nextChatItem.id}` : `/${PageRoutes.Feed}`;
    new Promise((res) => res('')).then(() => navigate(redirectTo));
  };

  return (
    <aside className={`sidebar ${isOpen ? '' : 'hidden'}`}>
      <div className='sidebar__main chats'>
        <button className='chats__new-btn btn-secondary' onClick={openCreating}>
          <span className='chats__new-btn-icon'></span>
          <span className='chats__new-btn-text'>New chat</span>
        </button>
        {isCreating && <CreateChatPopper closeCreating={closeCreating} createChatItem={addNewChat} />}
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
        <NavLink
          to={`/${PageRoutes.Feed}`}
          className={() => {
            const isActive = location.pathname === '/' || location.pathname === `/${PageRoutes.Feed}`;
            return 'sidebar__footer-item feed-link' + (isActive ? ' active' : '');
          }}
        >
          <span className='feed-link__icon'></span>
          <span className='feed-link__text'>Upwork feed</span>
        </NavLink>
        <button onClick={openLogout} className='sidebar__footer-item logout-btn' ref={setReferenceElement}>
          <span className='logout-btn__icon'></span>
          <span className='logout-btn__text'>{userData?.email || 'user'}</span>
          <span className='logout-btn__arrow'></span>
        </button>
        {isShowLogout && (
          <PopupTooltip close={hideLogout} refElem={referenceElement}>
            <button className='popup__btn' onClick={logout}>
              <span className='popup__btn-icon popup__btn-logout'></span>
              <span>Logout</span>
            </button>
          </PopupTooltip>
        )}
      </div>
    </aside>
  );
}

export default SideBar;
