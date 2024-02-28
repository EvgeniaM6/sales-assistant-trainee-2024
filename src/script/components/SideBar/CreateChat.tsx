import { useContext, useState } from 'react';
import CreateChatPopper from './CreateChatPopper';
import { ThemeContext } from '../../../App';

function CreateChat({ isCreateBtnDisabled }: {
  isCreateBtnDisabled: boolean,
}) {
  const { theme } = useContext(ThemeContext);
  const [isCreating, setIsCreating] = useState(false);

  const openCreating = () => setIsCreating(true);
  const closeCreating = () => setIsCreating(false);

  return (
    <>
      <button
        className={`chats__new-btn btn-secondary ${theme}`}
        onClick={openCreating}
        disabled={isCreateBtnDisabled}
      >
        <span className={`chats__new-btn-icon ${theme}`}></span>
        <span className='chats__new-btn-text'>New chat</span>
      </button>
      {isCreating && <CreateChatPopper closeCreating={closeCreating} />}
    </>
  );
}

export default CreateChat;
