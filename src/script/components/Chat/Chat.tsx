import ReactMarkdown from 'react-markdown';
import { useContext, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ThemeContext } from '../../../App';
import { IMessageDTO } from '../../../public-common/interfaces/dto/message/imessage-dto';
import { useSendMessageMutation } from '../../redux/messageApi';
import { useForm } from 'react-hook-form';
import { getErrorsArr, getLocalStorageTokens } from '../../utils';
import { SendMsgForm } from '../../models';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function Chat({ messagesArr, showSentMessage }: {
  messagesArr: IMessageDTO[],
  showSentMessage:(data: IMessageDTO) => void,
}) {
  const { theme } = useContext(ThemeContext);
  const chatsListRef = useRef<HTMLDivElement>(null);
  const [sentContent, setSentContent] = useState('');

  const [sendMessage, { error, isLoading, reset: resetSendMsg }] = useSendMessageMutation();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<SendMsgForm>();

  const handleSubmitForm = ({ content }: SendMsgForm) => {
    setSentContent(content);
    const [chatId] = location.pathname.split('/').slice(2);
    const { accessToken } = getLocalStorageTokens();
    sendMessage({ accessToken, values: { chatId: Number(chatId), content }});

    showSentMessage({
      id: Date.now().toString(),
      content,
      created: new Date(Date.now()).toISOString(),
      isBot: false,
      accountId: 0,
      chatId: 0,
    });
    reset();
  };

  useEffect(() => {
    chatsListRef.current?.scrollTo({
      top: chatsListRef.current.scrollHeight,
    });
  }, [messagesArr, sentContent]);

  useEffect(() => {
    if (!error) return;

    setTimeout(() => {
      resetSendMsg();
    }, 5000);
  }, [error]);

  return (
    <main className='chat'>
      <div className='chat__messages-container' ref={chatsListRef}>
        <div className='chat__messages'>
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
          {isLoading && <>
            <div className={`chat__message msg ${'bot'} ${theme}`}>
              <div className='msg__author'>
                <div className={`msg__author-icon ${'bot'} ${theme}`}></div>
              </div>
              <div className='msg__content'>
                <ReactMarkdown>{'looking for answer...'}</ReactMarkdown>
              </div>
            </div>
          </>}
          {error && <>
            {getErrorsArr(error).map((errMsg) => <ErrorMessage errorMsg={errMsg} key={errMsg} />)}
          </>}
        </div>
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
