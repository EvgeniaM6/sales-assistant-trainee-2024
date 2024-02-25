import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { AuthResponseError } from '../models';
import { AUTH_ERROR_RESP } from '../constants';

export const getErrorsArr = (error: FetchBaseQueryError | SerializedError): string[] => {
  const errorsArr: string[] = [];

  if ('error' in error) {
    errorsArr.push(error.error);
  } else {
    const errCode = (error as AuthResponseError).data?.error?.errorCode || '';

    if (errCode in AUTH_ERROR_RESP) {
      const errorsInfo = (error as AuthResponseError).data.error?.filedsValidationErrors;
      errorsArr.push(...AUTH_ERROR_RESP[errCode](errorsInfo));
    } else {
      errorsArr.push('Oops! Something went wrong. Try again');
    }
  }

  return errorsArr;
};
