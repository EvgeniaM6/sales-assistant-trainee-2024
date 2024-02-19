import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { BASE_URL, REQUEST_METHODS } from '../constants';
import { logOut } from '../store/authSlice';
import { BaseRoutes } from '../../public-common/enums/routes/base-routes.enum';
import { AuthRoutes } from '../../public-common/enums/routes/auth-routes.enum';
import { IAccessDTO } from '../../public-common/interfaces/dto/auth/iaccess.interface';
import { ITokenRequestDTO } from '../../public-common/interfaces/dto/auth/irefresh-token-request.interface';
import { IApiResponseGenericDTO } from '../../public-common/interfaces/dto/common/iapi-response.interface';
import { IAccountResponseDTO } from '../../public-common/interfaces/dto/account/iaccount-response.interfaces';
import { ILoginResponseDTO } from '../../public-common/interfaces/dto/auth/ilogin-response.interfaces';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, fetchFn: fetch });

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const loginUrl = `${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.Login}`;
  const isFetchingLogin = (args as FetchArgs).url === loginUrl;

  if (result.error && (result.error.status === 401 || result.error.status === 403) && !isFetchingLogin) {
    const tokens: IAccessDTO | null = JSON.parse(localStorage.getItem('tokens') || 'null');

    const body: ITokenRequestDTO = {
      token: tokens?.refreshToken || '',
    };

    const refreshResult = await baseQuery(
      {
        url: `${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.RefreshToken}`,
        method: REQUEST_METHODS.PUT,
        body,
      },
      api,
      extraOptions
    );

    const refreshData = refreshResult.data as IApiResponseGenericDTO<IAccountResponseDTO & ILoginResponseDTO>;

    if (refreshData) {
      const newTokens: IAccessDTO = refreshData.data.access;
      localStorage.setItem('tokens', JSON.stringify(newTokens));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
      localStorage.removeItem('tokens');
    }
  }
  return result;
};
