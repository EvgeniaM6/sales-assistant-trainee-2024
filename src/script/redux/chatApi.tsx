import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { BaseRoutes } from '../../public-common/enums/routes/base-routes.enum';
import { ChatRoutes } from '../../public-common/enums/routes/chat-routes.enum';
import { RequestCreateChat, RequestDeleteChat, RequestEditChat, RequestGetChats, ResponseDeleteChat, ResponseGetChat, ResponseGetChats } from '../models';
import { REQUEST_METHODS } from '../constants';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Chat'],
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
      providesTags: ['Chat'],
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
      invalidatesTags: ['Chat'],
    }),
    editChat: build.mutation<ResponseGetChat, RequestEditChat>({
      query: ({ accessToken, id, name }: RequestEditChat) => ({
        url: `${BaseRoutes.V1}/${ChatRoutes.BasePrefix}/${id}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/json',
          'Content-type': 'application/json',
        },
        method: REQUEST_METHODS.PUT,
        body: { name },
      }),
      invalidatesTags: ['Chat'],
    }),
    deleteChat: build.mutation<ResponseDeleteChat, RequestDeleteChat>({
      query: ({ accessToken, id }: RequestDeleteChat) => ({
        url: `${BaseRoutes.V1}/${ChatRoutes.BasePrefix}/${id}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/json',
          'Content-type': 'application/json',
        },
        method: REQUEST_METHODS.DELETE,
      }),
      invalidatesTags: ['Chat'],
    }),
  }),
});

export const { useGetChatsQuery, useCreateChatMutation, useEditChatMutation, useDeleteChatMutation } = chatApi;
