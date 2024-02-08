import { NavLink } from 'react-router-dom';
import { PageRoutes } from '../../constants';
import { useState } from 'react';
import { usePopper } from 'react-popper';

function ChatItem({ id, name, deleteChatItem, editChatItem }: {
  id: number;
  name: string;
  deleteChatItem: (id: number) => void;
  editChatItem: (id: number) => void
}) {
  const [isVisible, setIsVisible] = useState(false);

  const openMore = () => {
    setIsVisible(true);
  }

  const hideMore = () => {
    setIsVisible(false);
  };

  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
  });

  return (
    <li key={id} className='chats__item'>
      <NavLink to={`/${PageRoutes.Chat}/${id}`} className='chats__link'>
        <span className='chats__link-text'>{name}</span>
        <button className='chats__link-btn' onClick={openMore} ref={setReferenceElement}>
          <span className='chats__link-btn-icon'></span>
        </button>
        {isVisible && (
          <>
            <div className='chats__popover' onClick={hideMore} />
            <div
              ref={setPopperElement}
              style={{ ...styles.popper}}
              className='chats__popup popup'
              {...attributes.popper}
            >
              <button className='popup__btn' onClick={() => editChatItem(id)}>
                <span className='popup__btn-icon popup__btn-edit'></span>
                <span>Edit</span>
              </button>
              <button className='popup__btn' onClick={() => deleteChatItem(id)}>
                <span className='popup__btn-icon popup__btn-delete'></span>
                <span>Delete</span>
              </button>
            </div>
          </>
        )}
      </NavLink>
    </li>
  )
}

export default ChatItem;
