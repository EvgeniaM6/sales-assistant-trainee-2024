import { createApi } from '@reduxjs/toolkit/query/react';
import { REQUEST_METHODS } from '../constants';
import { ILoginResponseDTO } from '../../public-common/interfaces/dto/auth/ilogin-response.interfaces';
import { ILoginRequestDTO } from '../../public-common/interfaces/dto/auth/iadmin-login-request.interface';
import { AuthRoutes } from '../../public-common/enums/routes/auth-routes.enum';
import { IAccountResponseDTO } from '../../public-common/interfaces/dto/account/iaccount-response.interfaces';
import { IApiResponseGenericDTO } from '../../public-common/interfaces/dto/common/iapi-response.interface';
import { BaseRoutes } from '../../public-common/enums/routes/base-routes.enum';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    logIn: build.mutation<IApiResponseGenericDTO<ILoginResponseDTO & IAccountResponseDTO>, ILoginRequestDTO>({
      query: (values: ILoginRequestDTO) => ({
        url: `${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.Login}`,
        method: REQUEST_METHODS.POST,
        headers: {
          'accept': 'application/json',
          'Content-type': 'application/json',
        },
        body: values,
      }),
    }),
    recoverUser: build.query<IApiResponseGenericDTO<IAccountResponseDTO>, { accessToken: string }>({
      query: ({ accessToken }: { accessToken: string }) => ({
        url: `${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.RecoverUser}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/json',
        },
      }),
    }),
  }),
});

export const { useLogInMutation, useRecoverUserQuery } = authApi;
