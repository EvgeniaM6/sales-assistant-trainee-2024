import { IApiResponseDTO } from '../../public-common/interfaces/dto/common/iapi-response.interface';

export type AuthState = {
  isAuthorized: boolean;
  accessToken: string;
  refreshToken: string;
};

export type AuthResponseError = {
  data: IApiResponseDTO;
  status: number;
};
