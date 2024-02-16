import { IAccountDTO } from '../../public-common/interfaces/dto/account/iaccount.interface';
import { IApiResponseDTO } from '../../public-common/interfaces/dto/common/iapi-response.interface';

export type AuthState = {
  isAuthorized: boolean;
  userData: IAccountDTO | null;
};

export type AuthResponseError = {
  data: IApiResponseDTO;
  status: number;
};
