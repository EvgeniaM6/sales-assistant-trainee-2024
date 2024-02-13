import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateChatForm } from '../../models';
import Popup from '../Popup/Popup';

function CreateChatPopper({ createChatItem, closeCreating }: {
  createChatItem: (name: string) => void;
  closeCreating: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChatForm>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const createChat: SubmitHandler<CreateChatForm> = ({ chatName }) => {
    createChatItem(chatName);
    closeCreating();
  };

  return (
    <Popup close={closeCreating} confirm={handleSubmit(createChat)} confirmAction='Create'>
      <h3 className='popup__title'>Create chat name</h3>
      <form className='create__form'>
        <label className='create__label' htmlFor='chatName'>Chat history name</label>
        <input
          className={`create__input ${errors.chatName ? 'input-error' : ''}`}
          type='text'
          id='chatName'
          {...register('chatName', { required: 'This input is required' })}
        />
        {errors.chatName && <p className='error-message'>{errors.chatName.message}</p>}
      </form>
    </Popup>
  );
}

export default CreateChatPopper;
