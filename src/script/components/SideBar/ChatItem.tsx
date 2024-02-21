import { NavLink } from 'react-router-dom';
import { PageRoutes } from '../../constants';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import DeletePopper from './DeletePopper';
import { PopupTooltip } from '../Popup';

function ChatItem({ id, name, deleteChatItem, editChatItem }: {
  id: number;
  name: string;
  deleteChatItem: (id: number) => void;
  editChatItem: (id: number) => void
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      <NavLink to={`/${PageRoutes.Chat}/${id}`} className='chats__link'>
        <span className='chats__link-text'>{name}</span>
        <button className='chats__link-btn' onClick={openMore} ref={referenceElement}>
          <span className='chats__link-btn-icon'></span>
        </button>
        {isVisible && (
          <PopupTooltip close={hideMore} refElem={referenceElement.current}>
            <button className='popup__btn' onClick={() => editChatItem(id)}>
              <span className='popup__btn-icon popup__btn-edit'></span>
              <span>Edit</span>
            </button>
            <button className='popup__btn' onClick={openDeleting}>
              <span className='popup__btn-icon popup__btn-delete'></span>
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
      </NavLink>
    </li>
  );
}

export default ChatItem;
