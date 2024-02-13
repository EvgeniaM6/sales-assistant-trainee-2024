import { IFieldValidationErrorDTO } from '../../public-common/interfaces/dto/common/ifield-validation-error.interface';

export const AUTH_ERROR_RESP = {
  field_is_invalid: (errInfo: IFieldValidationErrorDTO[]) => errInfo.map((err) => err.errorMessage),
  account_not_found: () => ['Account not found'],
  invalid_password: () => ['Password is invalid'],
};
