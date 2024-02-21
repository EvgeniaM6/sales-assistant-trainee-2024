import ReactMarkdown from 'react-markdown';
import fetchMessages from './fetchMessages.json';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function Chat() {
  const messagesArr = fetchMessages.data;
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [maxHeightMessages, setMaxHeightMessages] = useState(textAreaRef.current?.style.height);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setValue(val);
  };

  useEffect(() => {
    setMaxHeightMessages(textAreaRef.current?.style.height);
  }, [textAreaRef.current?.style.height, value]);

  return (
    <main className='chat'>
      <div
        className='chat__messages'
        style={{
          maxHeight: `calc(100vh - 72px - 32px - ${maxHeightMessages})`,
        }}
      >
        {messagesArr
          .sort(({ created: createdA }, { created: createdB }) => {
            return new Date(createdA) > new Date(createdB) ? 1 : -1;
          })
          .map((message) => {
            const authorClassName = message.isBot ? 'bot' : 'user';
            return (
              <div className={`chat__message msg ${authorClassName}`} key={message.id}>
                <div className='msg__author'>
                  <div className={`msg__author-icon ${authorClassName}`}></div>
                </div>
                <div className='msg__content'>
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            );
          })
        }
      </div>
      <div className='chat__input'>
        <form className='chat__form'>
          <TextareaAutosize
            className='chat__form-textarea'
            name='chat'
            id='chat'
            autoComplete='off'
            placeholder='Write a question...'
            onChange={handleChange}
            ref={textAreaRef}
            maxRows={15}
            value={value}
          />
          <div className='chat__form-submit submit'>
            <button className='submit__btn' type="submit">
              <span className='submit__btn-icon'></span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Chat;
