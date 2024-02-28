import { useEffect, useState } from 'react';
import { useCreateChatMutation, useDeleteChatMutation, useEditChatMutation } from '../../redux/chatApi';
import { getErrorsArr } from '../../utils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function SideBarErrors() {
  const [errorsArr, setErrorsArr] = useState<{[key: string]: string[]}>({});

  const { error: createError } = useCreateChatMutation({ fixedCacheKey: 'createCacheKey' })[1];
  const { error: editError } = useEditChatMutation({ fixedCacheKey: 'editCacheKey' })[1];
  const { error: deleteError } = useDeleteChatMutation({ fixedCacheKey: 'deleteCacheKey' })[1];

  useEffect(() => {
    if (!createError) return;
    const errorsArr = getErrorsArr(createError);

    const time = Date.now();
    setErrorsArr((prevState) => ({ ...prevState, [time.toString()]: errorsArr }));

    setTimeout(() => {
      setErrorsArr((prevState) => {
        const newState = { ...prevState };
        delete newState[time];
        return newState;
      });
    }, 5000);
  }, [createError]);

  useEffect(() => {
    if (!editError) return;
    const errorsArr = getErrorsArr(editError);

    const time = Date.now();
    setErrorsArr((prevState) => ({ ...prevState, [time.toString()]: errorsArr }));

    setTimeout(() => {
      setErrorsArr((prevState) => {
        const newState = { ...prevState };
        delete newState[time];
        return newState;
      });
    }, 5000);
  }, [editError]);

  useEffect(() => {
    if (!deleteError) return;
    const errorsArr = getErrorsArr(deleteError);

    const time = Date.now();
    setErrorsArr((prevState) => ({ ...prevState, [time.toString()]: errorsArr }));

    setTimeout(() => {
      setErrorsArr((prevState) => {
        const newState = { ...prevState };
        delete newState[time];
        return newState;
      });
    }, 5000);
  }, [deleteError]);

  return (
    <div className='sidebar__msg'>
      {Object.entries(errorsArr).map(
        ([time, errorMsgArr]) => errorMsgArr.map(
          (errorMsg) => <ErrorMessage errorMsg={errorMsg} key={`${time}${errorMsg}`} />
        )
      )}
    </div>
  );
}

export default SideBarErrors;
