import ReactMarkdown from 'react-markdown';
import { useContext, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ThemeContext } from '../../../App';
import { IMessageDTO } from '../../../public-common/interfaces/dto/message/imessage-dto';

function Chat({ messagesArr }: { messagesArr: IMessageDTO[] }) {
  const { theme } = useContext(ThemeContext);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('e=', e);
  };

  return (
    <main className='chat'>
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
      </div>
      <div className={`chat__input ${theme}`}>
        <form className='chat__form' onSubmit={handleSubmitForm}>
          <TextareaAutosize
            className={`chat__form-textarea ${theme}`}
            name='chat'
            id='chat'
            autoComplete='off'
            placeholder='Write a question...'
            ref={textAreaRef}
            maxRows={15}
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
