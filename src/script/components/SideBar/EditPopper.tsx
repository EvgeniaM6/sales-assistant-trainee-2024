import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateChatForm } from '../../models';
import { Popup } from '../Popup';
import { ThemeContext } from '../../../App';

function EditPopper({ id, name, editChatItem, closeEditing }: {
  id: number;
  name: string;
  editChatItem: (id: number, name: string) => void;
  closeEditing: () => void;
}) {
  const { theme } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChatForm>({ reValidateMode: 'onSubmit', defaultValues: { chatName: name } });

  const editChat: SubmitHandler<CreateChatForm> = ({ chatName }) => {
    editChatItem(id, chatName);
    closeEditing();
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
