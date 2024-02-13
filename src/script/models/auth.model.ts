import { FieldValues } from 'react-hook-form';
import { IApiResponseDTO } from '../../public-common/interfaces/dto/common/iapi-response.interface';

export interface AuthFormValues extends FieldValues {
  login: string;
  password: string;
}

export type AuthState = {
  isAuthorized: boolean;
  accessToken: string;
  refreshToken: string;
};

export type AuthResponseError = {
  data: IApiResponseDTO;
  status: number;
};
