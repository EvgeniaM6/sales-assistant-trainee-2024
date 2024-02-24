import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { BaseRoutes } from '../../public-common/enums/routes/base-routes.enum';
import { ChatRoutes } from '../../public-common/enums/routes/chat-routes.enum';
import { RequestCreateChat, RequestGetChats, ResponseGetChat, ResponseGetChats } from '../models';
import { REQUEST_METHODS } from '../constants';

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
    createChat: build.mutation<ResponseGetChat, RequestCreateChat>({
      query: ({ accessToken, name }: RequestCreateChat) => ({
        url: `${BaseRoutes.V1}/${ChatRoutes.BasePrefix}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/json',
          'Content-type': 'application/json',
        },
        method: REQUEST_METHODS.POST,
        body: { name },
      }),
    }),
  }),
});

export const { useGetChatsQuery, useCreateChatMutation } = chatApi;
