import { NavLink } from 'react-router-dom';
import { PageRoutes } from '../../constants';
import { useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import DeletePopper from './DeletePopper';
import { PopupTooltip } from '../Popup';
import { ThemeContext } from '../../../App';
import EditPopper from './EditPopper';

function ChatItem({ id, name }: {
  id: number;
  name: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { theme } = useContext(ThemeContext);

  const openMore = () => {
    setIsVisible(true);
  };

  const hideMore = () => {
    setIsVisible(false);
  };

  const openDeleting = () => {
    setIsDeleting(true);
    hideMore();
  };

  const closeDeleting = () => {
    setIsDeleting(false);
  };

  const openEditing = () => {
    setIsEditing(true);
    hideMore();
  };

  const closeEditing = () => {
    setIsEditing(false);
  };

  const referenceRef = useRef<HTMLLIElement | null>(null);

  return (
    <li key={id} className='chats__item' ref={referenceRef}>
      <NavLink to={`/${PageRoutes.Chat}/${id}`} className={`chats__link ${theme}`}>
        <span className='chats__link-text'>{name}</span>
      </NavLink>
      <button className={`chats__link-btn ${theme}`} onClick={openMore}>
        <span className={`chats__link-btn-icon ${theme}`}></span>
      </button>
      {isVisible && (
        <PopupTooltip close={hideMore} refElem={referenceRef}>
          <button className={`popup__btn ${theme}`} onClick={openEditing}>
            <span className={`popup__btn-icon popup__btn-edit ${theme}`}></span>
            <span>Edit</span>
          </button>
          <button className={`popup__btn ${theme}`} onClick={openDeleting}>
            <span className={`popup__btn-icon popup__btn-delete ${theme}`}></span>
            <span>Delete</span>
          </button>
        </PopupTooltip>
      )}
      {isEditing && (
        createPortal(
          <EditPopper
            id={id}
            name={name}
            closeEditing={closeEditing}
          />,
          document.body
        ))
      }
      {isDeleting && (
        createPortal(
          <DeletePopper
            id={id}
            name={name}
            closeDeleting={closeDeleting}
          />,
          document.body
        ))
      }
    </li>
  );
}

export default ChatItem;
