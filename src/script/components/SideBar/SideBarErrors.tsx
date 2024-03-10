import { useEffect, useState } from 'react';
import { useCreateChatMutation, useDeleteChatMutation, useEditChatMutation } from '../../redux/chatApi';
import { getErrorsArr } from '../../utils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

function SideBarErrors() {
  const [errorsArr, setErrorsArr] = useState<{[key: string]: string[]}>({});

  const { error: createError, reset: resetCreateResult } = useCreateChatMutation({ fixedCacheKey: 'createCacheKey' })[1];
  const { error: editError, reset: resetEditResult } = useEditChatMutation({ fixedCacheKey: 'editCacheKey' })[1];
  const { error: deleteError, reset: resetDeleteResult } = useDeleteChatMutation({ fixedCacheKey: 'deleteCacheKey' })[1];

  const showError = (error: FetchBaseQueryError | SerializedError): void => {
    const errorsArr = getErrorsArr(error);

    const time = Date.now();
    setErrorsArr((prevState) => ({ ...prevState, [time.toString()]: errorsArr }));

    setTimeout(() => {
      setErrorsArr((prevState) => {
        const newState = { ...prevState };
        delete newState[time];
        return newState;
      });
    }, 5000);
  };

  useEffect(() => {
    if (!createError) return;
    showError(createError);

    setTimeout(() => {
      resetCreateResult();
    }, 5000);
  }, [createError]);

  useEffect(() => {
    if (!editError) return;
    showError(editError);

    setTimeout(() => {
      resetEditResult();
    }, 5000);
  }, [editError]);

  useEffect(() => {
    if (!deleteError) return;
    showError(deleteError);

    setTimeout(() => {
      resetDeleteResult();
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
