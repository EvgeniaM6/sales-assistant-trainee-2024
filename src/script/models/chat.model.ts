import { IChatItem } from '../../public-common/interfaces/dto/chat/dto/ichat-item';
import { IApiResponseGenericDTO } from '../../public-common/interfaces/dto/common/iapi-response.interface';
import { IMessageDTO } from '../../public-common/interfaces/dto/message/imessage-dto';
import { ISendMessageRequest } from '../../public-common/interfaces/dto/message/isend-message-request.interface';

export type ResponseGetChats = IApiResponseGenericDTO<IChatItem[]>;
export type ResponseGetChat = IApiResponseGenericDTO<IChatItem>;
export type ResponseDeleteChat = IApiResponseGenericDTO<boolean>;
export type RespGetMessagesByChatId = IApiResponseGenericDTO<IMessageDTO[]>;
export type RespSendMsg = IApiResponseGenericDTO<IMessageDTO>;

export type RequestGetChats = {
  accessToken: string,
};

export type RequestCreateChat = RequestGetChats & {
  name: string,
};

export type RequestEditChat = RequestCreateChat & RequestDeleteChat;

export type RequestDeleteChat = RequestGetChats & {
  id: number,
};

export type RequestSendMsg = RequestGetChats & {
  values: ISendMessageRequest,
};

export type SendMsgForm = Pick<ISendMessageRequest, 'content'>;
