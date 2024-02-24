import { IChatItem } from '../../public-common/interfaces/dto/chat/dto/ichat-item';
import { IApiResponseGenericDTO } from '../../public-common/interfaces/dto/common/iapi-response.interface';
import { IMessageDTO } from '../../public-common/interfaces/dto/message/imessage-dto';

export type ResponseGetChats = IApiResponseGenericDTO<IChatItem[]>;
export type ResponseGetChat = IApiResponseGenericDTO<IChatItem>;
export type RespGetMessagesByChatId = IApiResponseGenericDTO<IMessageDTO[]>;

export type RequestGetChats = {
  accessToken: string,
};

export type RequestCreateChat = RequestGetChats & {
  name: string,
};
