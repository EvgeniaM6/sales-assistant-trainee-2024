import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateChatForm } from '../../models';
import { Popup } from '../Popup';
import { ThemeContext } from '../../../App';
import { useEditChatMutation } from '../../redux/chatApi';
import { getLocalStorageTokens } from '../../utils';

function EditPopper({ id, name, closeEditing }: {
  id: number;
  name: string;
  closeEditing: () => void;
}) {
  const [editChatItem] = useEditChatMutation({ fixedCacheKey: 'editCacheKey' });
  const { theme } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChatForm>({ reValidateMode: 'onSubmit', defaultValues: { chatName: name } });

  const editChat: SubmitHandler<CreateChatForm> = async ({ chatName }) => {
    closeEditing();
    const { accessToken } = getLocalStorageTokens();
    await editChatItem({ accessToken, id, name: chatName });
  };

  return (
    <Popup close={closeEditing} confirm={handleSubmit(editChat)} confirmAction='Edit'>
      <h3 className='popup__title'>Edit chat name</h3>
      <form className='popup__form'>
        <label className='popup__label' htmlFor='chatName'>Chat history name</label>
        <input
          className={`popup__input ${errors.chatName ? 'input-error' : ''} ${theme}`}
          type='text'
          id='chatName'
          {...register('chatName', { required: 'This input is required' })}
          autoComplete='off'
        />
        {errors.chatName && <p className='error-message'>{errors.chatName.message}</p>}
      </form>
    </Popup>
  );
}

export default EditPopper;
