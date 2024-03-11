import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chat, Header, SideBar, Spin } from '../components';
import { ThemeContext } from '../../App';
import { getLocalStorageTokens } from '../utils';
import { useGetMessagesByChatIdQuery, useSubscribeMutation } from '../redux/messageApi';
import { ISubscriptionToChatMessagesDTO } from '../../public-common/interfaces/dto/message/isubscription-to-chat-messages.dto';
import { socket } from '../socket';
import { NotificationEvents } from '../../public-common/enums/notification/notification-events.enum';
import { IMessageDTO } from '../../public-common/interfaces/dto/message/imessage-dto';

function ChatPage() {
  const { id } = useParams();
  if (!id) return null;

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { theme } = useContext(ThemeContext);

  const { accessToken } = getLocalStorageTokens();
  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useGetMessagesByChatIdQuery({ accessToken, id });
  const [handleSubscribe] = useSubscribeMutation();

  const [messagesArr, setMessagesArr] = useState<IMessageDTO[]>(data?.data ?? []);

  const toggleOpenSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  useEffect(() => {
    if (!data) return;
    setMessagesArr(data.data);
  }, [data]);

  const handleSetMessagesArr = (data: IMessageDTO): void => {
    setMessagesArr((prevState) => {
      const newMessagesArr = [...prevState, data];
      return newMessagesArr;
    });
  };

  useEffect(() => {
    refetch();

    const { accessToken } = getLocalStorageTokens();
    const values: ISubscriptionToChatMessagesDTO = {
      accessToken, chatId: Number(id),
    };

    handleSubscribe(values);

    socket.on(NotificationEvents.ChatResponse, (data) => {
      handleSetMessagesArr(data as IMessageDTO);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [id]);

  return (
    <div className='page chat-page'>
      <SideBar isOpen={isSideBarOpen} />
      <div className={`page__part${isSideBarOpen ? '-full' : ''} chat-page__main ${theme}`}>
        <Header isSideBarOpen={isSideBarOpen} toggleOpenSideBar={toggleOpenSideBar} />
        {(isLoading || isFetching) && <Spin />}
        {data && !isLoading && !isFetching && <Chat messagesArr={messagesArr} showSentMessage={handleSetMessagesArr} />}
      </div>
    </div>
  );
}

export default ChatPage;
