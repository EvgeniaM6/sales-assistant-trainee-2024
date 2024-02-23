import { NavLink } from 'react-router-dom';
import { PageRoutes } from '../../constants';
import { useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import DeletePopper from './DeletePopper';
import { PopupTooltip } from '../Popup';
import { ThemeContext } from '../../../App';

function ChatItem({ id, name, deleteChatItem, editChatItem }: {
  id: number;
  name: string;
  deleteChatItem: (id: number) => void;
  editChatItem: (id: number) => void
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { theme } = useContext(ThemeContext);

  const openMore = () => {
    setIsVisible(true);
  };

  const openDeleting = () => {
    setIsDeleting(true);
    hideMore();
  };

  const closeDeleting = () => {
    setIsDeleting(false);
  };

  const hideMore = () => {
    setIsVisible(false);
  };

  const referenceElement = useRef<HTMLButtonElement | null>(null);

  return (
    <li key={id} className='chats__item'>
      <NavLink to={`/${PageRoutes.Chat}/${id}`} className={`chats__link ${theme}`}>
        <span className='chats__link-text'>{name}</span>
      </NavLink>
      <button className={`chats__link-btn ${theme}`} onClick={openMore} ref={referenceElement}>
        <span className={`chats__link-btn-icon ${theme}`}></span>
      </button>
      {isVisible && (
        <PopupTooltip close={hideMore} refElem={referenceElement}>
          <button className={`popup__btn ${theme}`} onClick={() => editChatItem(id)}>
            <span className={`popup__btn-icon popup__btn-edit ${theme}`}></span>
            <span>Edit</span>
          </button>
          <button className={`popup__btn ${theme}`} onClick={openDeleting}>
            <span className={`popup__btn-icon popup__btn-delete ${theme}`}></span>
            <span>Delete</span>
          </button>
        </PopupTooltip>
      )}
      {isDeleting && (
        createPortal(
          <DeletePopper
            id={id}
            name={name}
            deleteChatItem={deleteChatItem}
            closeDeleting={closeDeleting}
          />,
          document.body
        ))
      }
    </li>
  );
}

export default ChatItem;
