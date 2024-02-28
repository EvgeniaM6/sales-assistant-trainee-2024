import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateChatForm } from '../../models';
import { Popup } from '../Popup';
import { ThemeContext } from '../../../App';
import { useCreateChatMutation } from '../../redux/chatApi';
import { getLocalStorageTokens } from '../../utils';

function CreateChatPopper({ closeCreating }: {
  closeCreating: () => void;
}) {
  const { theme } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChatForm>({ reValidateMode: 'onSubmit' });

  const [createChatItem] = useCreateChatMutation({ fixedCacheKey: 'createCacheKey' });

  const createChat: SubmitHandler<CreateChatForm> = async ({ chatName }) => {
    closeCreating();
    const { accessToken } = getLocalStorageTokens();
    await createChatItem({ accessToken, name: chatName });
  };

  return (
    <Popup close={closeCreating} confirm={handleSubmit(createChat)} confirmAction='Create'>
      <h3 className='popup__title'>Create chat name</h3>
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

export default CreateChatPopper;
