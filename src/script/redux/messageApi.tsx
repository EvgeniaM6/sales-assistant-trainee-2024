import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { BaseRoutes } from '../../public-common/enums/routes/base-routes.enum';
import { MessagesRoutesEnum } from '../../public-common/enums/routes/messages-routes.enum';
import { RequestGetById, RespGetMessagesByChatId } from '../models';

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getMessagesByChatId: build.query<RespGetMessagesByChatId, RequestGetById>({
      query: ({ accessToken, id }: RequestGetById) => ({
        url: `${BaseRoutes.V1}/${MessagesRoutesEnum.BasePrefix}/${id}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/json',
          'Content-type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useGetMessagesByChatIdQuery } = messageApi;
