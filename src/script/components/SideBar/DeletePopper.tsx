import { useDeleteChatMutation } from '../../redux/chatApi';
import { getLocalStorageTokens } from '../../utils';
import { Popup } from '../Popup';

function DeletePopper({ id, name, closeDeleting }: {
  id: number;
  name: string;
  closeDeleting: () => void;
}) {
  const [deleteChatItem] = useDeleteChatMutation({ fixedCacheKey: 'deleteCacheKey' });

  const deleteChat = async () => {
    closeDeleting();
    const { accessToken } = getLocalStorageTokens();
    await deleteChatItem({ accessToken, id });
  };

  return (
    <Popup close={closeDeleting} confirm={deleteChat} confirmAction='Delete'>
      <h3 className='popup__title'>Delete chat</h3>
      <p>{`Are you sure you want to delete chat ${name}?`}</p>
    </Popup>
  );
}

export default DeletePopper;
