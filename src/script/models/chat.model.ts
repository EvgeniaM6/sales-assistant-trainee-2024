import { IChatItem } from '../../public-common/interfaces/dto/chat/dto/ichat-item';
import { IApiResponseGenericDTO } from '../../public-common/interfaces/dto/common/iapi-response.interface';

export type ResponseGetChats = IApiResponseGenericDTO<IChatItem[]>;

export type RequestGetChats = {
  accessToken: string,
};
