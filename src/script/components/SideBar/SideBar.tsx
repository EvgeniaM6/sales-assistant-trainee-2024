import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IChatItem } from '../../../public-common/interfaces/dto/chat/dto/ichat-item';
import { PageRoutes } from '../../constants';
import ChatItem from './ChatItem';
import { ThemeContext } from '../../../App';
import { useCreateChatMutation, useDeleteChatMutation, useEditChatMutation, useGetChatsQuery } from '../../redux/chatApi';
import { getLocalStorageTokens } from '../../utils';
import Spin from '../Spin/Spin';
import SideBarFooter from './SideBarFooter';
import SideBarErrors from './SideBarErrors';
import CreateChat from './CreateChat';

function SideBar({ isOpen }: { isOpen: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [deletedChatIndex, setDeletedChatIndex] = useState<number | null>(null);

  const {
    data: createData,
    isLoading: isCreateLoading,
    isSuccess: isCreateSuccess,
    reset: resetCreateResult,
  } = useCreateChatMutation({ fixedCacheKey: 'createCacheKey' })[1];
  const { isLoading: isEditLoading } = useEditChatMutation({ fixedCacheKey: 'editCacheKey' })[1];
  const {
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
    reset: resetDeleteResult,
  } = useDeleteChatMutation({ fixedCacheKey: 'deleteCacheKey' })[1];

  const { theme } = useContext(ThemeContext);

  const { accessToken } = getLocalStorageTokens();
  const {
    data: chatsData,
    isLoading: isGetChatsLoading,
  } = useGetChatsQuery({ accessToken });

  const { chatsList } = useMemo(() => ({
    chatsList: chatsData?.data ?? [],
  }), [chatsData]);

  useEffect(() => {
    if (!isDeleteSuccess) return;

    const [path, chatId] = location.pathname.split('/').slice(1);
    if (path !== PageRoutes.Chat || !chatId) return;

    const currentChatIndex = chatsList.findIndex(({ id }) => id === Number(chatId));
    setDeletedChatIndex(currentChatIndex);
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (!chatsData || deletedChatIndex === null) return;

    const [path, chatId] = location.pathname.split('/').slice(1);
    if (path !== PageRoutes.Chat || !chatId) return;

    const currentChatIndex = chatsList.findIndex(({ id }) => id === Number(chatId));
    if (currentChatIndex > -1) return;

    const nextChatItem: IChatItem | null = chatsList[deletedChatIndex] || chatsList[deletedChatIndex - 1] || null;
    setDeletedChatIndex(null);

    const redirectTo = nextChatItem ? `/${PageRoutes.Chat}/${nextChatItem.id}` : `/${PageRoutes.Feed}`;
    navigate(redirectTo);
  }, [chatsData]);

  useEffect(() => {
    if (!createData) return;
    navigate(`/${PageRoutes.Chat}/${createData.data.id}`);
  }, [createData]);

  useEffect(() => {
    if (isCreateSuccess) {
      resetCreateResult();
    }
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      resetDeleteResult();
    }
  }, [isDeleteSuccess]);

  const isCreateBtnDisabled = isGetChatsLoading || isCreateLoading || isEditLoading || isDeleteLoading;

  return (
    <aside className={`sidebar ${isOpen ? '' : 'hidden'} ${theme}`}>
      <div className='sidebar__main chats'>
        <CreateChat isCreateBtnDisabled={isCreateBtnDisabled} />
        <SideBarErrors />
        <ul className='chats__list'>
          {isCreateBtnDisabled && <Spin isInset={true} />}
          {!!chatsList.length && <>
            {chatsList.map((chat) => (
              <ChatItem
                key={chat.id}
                id={chat.id}
                name={chat.name}
              />
            ))}
          </>}
        </ul>
      </div>
      <SideBarFooter />
    </aside>
  );
}

export default SideBar;
