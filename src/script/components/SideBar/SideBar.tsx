import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IChatItem } from '../../../public-common/interfaces/dto/chat/dto/ichat-item';
import { PageRoutes } from '../../constants';
import ChatItem from './ChatItem';
import CreateChatPopper from './CreateChatPopper';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOut } from '../../store/authSlice';
import { PopupTooltip } from '../Popup';
import { ThemeContext } from '../../../App';
import { useCreateChatMutation, useEditChatMutation, useGetChatsQuery } from '../../redux/chatApi';
import { getErrorsArr, getLocalStorageTokens } from '../../utils';
import Spin from '../Spin/Spin';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function SideBar({ isOpen }: { isOpen: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((store) => store.auth);
  const [createChat, { error }] = useCreateChatMutation();
  const [editChat, { error: editError }] = useEditChatMutation();

  const [chatsList, setChatsList] = useState<IChatItem[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isShowLogout, setIsShowLogout] = useState(false);
  const [errorsArr, setErrorsArr] = useState<string[]>([]);

  const { theme } = useContext(ThemeContext);

  const { accessToken } = getLocalStorageTokens();
  const {
    data,
    isLoading,
    refetch,
  } = useGetChatsQuery({ accessToken });

  useEffect(() => {
    if (data) {
      setChatsList(data.data);
    }
  }, [data]);

  useEffect(() => {
    const errorsArr: string[] = [];

    if (error) {
      errorsArr.push(...getErrorsArr(error));
    }

    if (editError) {
      errorsArr.push(...getErrorsArr(editError));
    }

    setErrorsArr(errorsArr);

    setTimeout(() => {
      setErrorsArr([]);
    }, 5000);
  }, [error, editError]);

  const referenceElement = useRef<HTMLButtonElement | null>(null);

  const openLogout = () => {
    setIsShowLogout(true);
  };

  const hideLogout = () => {
    setIsShowLogout(false);
  };

  const openCreating = () => setIsCreating(true);
  const closeCreating = () => setIsCreating(false);

  const addNewChat = async (name: string) => {
    setErrorsArr([]);

    const { accessToken } = getLocalStorageTokens();
    await createChat({ accessToken, name });
    await refetch();
  };

  const logout = () => {
    dispatch(logOut());
    localStorage.removeItem('tokens');
  };

  const editChatItem = async (id: number, name: string) => {
    const { accessToken } = getLocalStorageTokens();
    await editChat({ accessToken, id, name });
    await refetch();
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
    <aside className={`sidebar ${isOpen ? '' : 'hidden'} ${theme}`}>
      <div className='sidebar__main chats'>
        <button className={`chats__new-btn btn-secondary ${theme}`} onClick={openCreating}>
          <span className={`chats__new-btn-icon ${theme}`}></span>
          <span className='chats__new-btn-text'>New chat</span>
        </button>
        {isCreating && <CreateChatPopper closeCreating={closeCreating} createChatItem={addNewChat} />}
        <div className='sidebar__msg'>
          {errorsArr.map((errorMsg) => <ErrorMessage errorMsg={errorMsg} key={errorMsg} />)}
        </div>
        <ul className='chats__list'>
          {isLoading && <Spin isInset={true} />}
          {chatsList.length && (
            <>
              {chatsList.map((chat) => (
                <ChatItem
                  key={chat.id}
                  id={chat.id}
                  name={chat.name}
                  deleteChatItem={deleteChatItem}
                  editChatItem={editChatItem}
                />
              ))}
            </>
          )}
        </ul>
      </div>
      <div className='sidebar__footer'>
        <div className='sidebar__footer-item'>
          <NavLink
            to={`/${PageRoutes.Feed}`}
            className={() => {
              const isActive = location.pathname === '/' || location.pathname === `/${PageRoutes.Feed}`;
              return `sidebar__footer-btn feed-link ${theme} ${isActive ? ' active' : ''}`;
            }}
          >
            <span className={`feed-link__icon ${theme}`}></span>
            <span className='feed-link__text'>Upwork feed</span>
          </NavLink>
        </div>
        <div className='sidebar__footer-item'>
          <button onClick={openLogout} className={`sidebar__footer-btn logout-btn ${theme}`} ref={referenceElement}>
            <span className={`logout-btn__icon ${theme}`}></span>
            <span className='logout-btn__text'>{userData?.email || 'user'}</span>
            <span className={`logout-btn__arrow ${theme}`}></span>
          </button>
          {isShowLogout && (
            <PopupTooltip close={hideLogout} refElem={referenceElement}>
              <button className={`popup__btn ${theme}`} onClick={logout}>
                <span className={`popup__btn-icon popup__btn-logout ${theme}`}></span>
                <span>Logout</span>
              </button>
            </PopupTooltip>
          )}
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
