import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, REQUEST_METHODS } from '../constants';
import fetch from 'isomorphic-fetch';
import { ILoginResponseDTO } from '../../public-common/interfaces/dto/auth/ilogin-response.interfaces';
import { ILoginRequestDTO } from '../../public-common/interfaces/dto/auth/iadmin-login-request.interface';
import { AuthRoutes } from '../../public-common/enums/routes/auth-routes.enum';
import { IAccountResponseDTO } from '../../public-common/interfaces/dto/account/iaccount-response.interfaces';
import { ITokenRequestDTO } from '../../public-common/interfaces/dto/auth/irefresh-token-request.interface';
import { IApiResponseDTO } from '../../public-common/interfaces/dto/common/iapi-response.interface';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, fetchFn: fetch }),
  endpoints: (build) => ({
    logIn: build.mutation<ILoginResponseDTO & IAccountResponseDTO, ILoginRequestDTO>({
      query: (values: ILoginRequestDTO) => ({
        url: `/api/v1/${AuthRoutes.BasePrefix}/${AuthRoutes.Login}`,
        method: REQUEST_METHODS.POST,
        headers: {
          'accept': 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values),
      }),
    }),
    refreshToken: build.mutation<IApiResponseDTO, ITokenRequestDTO>({
      query: (values: ITokenRequestDTO) => ({
        url: `/api/v1/${AuthRoutes.BasePrefix}/${AuthRoutes.RefreshToken}`,
        method: REQUEST_METHODS.PUT,
        headers: {
          'accept': 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values),
      }),
    }),
  }),
});

export const { useLogInMutation, useRefreshTokenMutation } = authApi;