import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { BaseRoutes } from '../../public-common/enums/routes/base-routes.enum';
import { ChatRoutes } from '../../public-common/enums/routes/chat-routes.enum';
import { RequestGetChats, ResponseGetChats } from '../models';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getChats: build.query<ResponseGetChats, RequestGetChats>({
      query: ({ accessToken }: RequestGetChats) => ({
        url: `${BaseRoutes.V1}/${ChatRoutes.BasePrefix}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/json',
          'Content-type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useGetChatsQuery } = chatApi;
