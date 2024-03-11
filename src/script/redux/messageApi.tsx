import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { BaseRoutes } from '../../public-common/enums/routes/base-routes.enum';
import { MessagesRoutesEnum } from '../../public-common/enums/routes/messages-routes.enum';
import { RequestGetById, RequestSendMsg, RespGetMessagesByChatId, RespSendMsg, RespSubscribeChat } from '../models';
import { REQUEST_METHODS } from '../constants';
import { ISubscriptionToChatMessagesDTO } from '../../public-common/interfaces/dto/message/isubscription-to-chat-messages.dto';
import { socket } from '../socket';

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
    sendMessage: build.mutation<RespSendMsg, RequestSendMsg>({
      query: ({ accessToken, values }: RequestSendMsg) => ({
        url: `${BaseRoutes.V1}/${MessagesRoutesEnum.BasePrefix}/${MessagesRoutesEnum.SendMessage}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'accept': 'application/json',
          'Content-type': 'application/json',
        },
        method: REQUEST_METHODS.POST,
        body: values,
      }),
    }),
    subscribe: build.mutation<string, ISubscriptionToChatMessagesDTO>({
      queryFn: async (values: ISubscriptionToChatMessagesDTO) => {
        // const result: RespSubscribeChat = await new Promise((res) => {
        //   socket.emit(MessagesRoutesEnum.Subscribe, values, (resp: RespSubscribeChat) => {
        //     console.log('resp=', resp);
        //     res(resp);
        //   });
        // });
        await new Promise((res) => {
          socket.emit(MessagesRoutesEnum.Subscribe, values, (resp: RespSubscribeChat) => {
            // console.log('resp=', resp);
            res(resp);
          });
        });

        // console.log('result=', result);

        // if (!result.error) {
        //   // return { status: result.statusCode, data: result.data as unknown };
        //   return undefined;
        // }
        // return { data: result.data };

        // const err: FetchBaseQueryError = { status: result.statusCode, data: result.error as unknown };
        // return err;
        // return result;
        // return { error: result.error };
        return { data: '' };
      },
    }),
  }),
});

export const { useGetMessagesByChatIdQuery, useSendMessageMutation, useSubscribeMutation } = messageApi;
