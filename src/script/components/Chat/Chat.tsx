import ReactMarkdown from 'react-markdown';
import { useContext, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ThemeContext } from '../../../App';
import { IMessageDTO } from '../../../public-common/interfaces/dto/message/imessage-dto';
import { useGetMessagesByChatIdQuery, useSendMessageMutation } from '../../redux/messageApi';
import { useForm } from 'react-hook-form';
import { getLocalStorageTokens } from '../../utils';
import { SendMsgForm } from '../../models';

function Chat({ messagesArr }: { messagesArr: IMessageDTO[] }) {
  const { theme } = useContext(ThemeContext);
  const chatsListRef = useRef<HTMLDivElement>(null);

  const [chatId] = location.pathname.split('/').slice(2);
  const { accessToken } = getLocalStorageTokens();

  const [sendMessage, { isSuccess }] = useSendMessageMutation();
  const { refetch } = useGetMessagesByChatIdQuery({ accessToken, id: chatId });

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<SendMsgForm>();

  const handleSubmitForm = ({ content }: SendMsgForm) => {
    const [chatId] = location.pathname.split('/').slice(2);
    const { accessToken } = getLocalStorageTokens();
    sendMessage({ accessToken, values: { chatId: Number(chatId), content }});
  };

  useEffect(() => {
    chatsListRef.current?.scrollTo({
      top: chatsListRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messagesArr]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      reset();
    }
  }, [isSuccess]);

  return (
    <main className='chat'>
      <div className='chat__messages' ref={chatsListRef}>
        {[...messagesArr]
          .sort(({ created: createdA }, { created: createdB }) => {
            return new Date(createdA) > new Date(createdB) ? 1 : -1;
          })
          .map((message) => {
            const authorClassName = message.isBot ? 'bot' : 'user';
            return (
              <div className={`chat__message msg ${authorClassName} ${theme}`} key={message.id}>
                <div className='msg__author'>
                  <div className={`msg__author-icon ${authorClassName} ${theme}`}></div>
                </div>
                <div className='msg__content'>
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            );
          })
        }
      </div>
      <div className={`chat__input ${theme}`}>
        <form className='chat__form' onSubmit={handleSubmit(handleSubmitForm)}>
          <TextareaAutosize
            className={`chat__form-textarea ${theme}`}
            id='chat'
            autoComplete='off'
            placeholder='Write a question...'
            maxRows={15}
            {...register('content', { required: true })}
          />
          <div className='chat__form-submit submit'>
            <button className={`submit__btn ${theme}`} type='submit'>
              <span className={`submit__btn-icon ${theme}`}></span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Chat;
