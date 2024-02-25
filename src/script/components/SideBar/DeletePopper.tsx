import { Popup } from '../Popup';

function DeletePopper({ id, name, deleteChatItem, closeDeleting }: {
  id: number;
  name: string;
  deleteChatItem: (id: number) => void;
  closeDeleting: () => void;
}) {
  const deleteChat = () => {
    deleteChatItem(id);
    closeDeleting();
  };

  return (
    <Popup close={closeDeleting} confirm={deleteChat} confirmAction='Delete'>
      <h3 className='popup__title'>Delete chat</h3>
      <p>{`Are you sure you want to delete chat ${name}?`}</p>
    </Popup>
  );
}

export default DeletePopper;
