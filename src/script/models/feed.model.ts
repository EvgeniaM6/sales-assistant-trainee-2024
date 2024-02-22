import { IApiResponseGenericDTO } from '../../public-common/interfaces/dto/common/iapi-response.interface';
import { IUpworkFeedDetailItemDTO } from '../../public-common/interfaces/dto/upwork-feed/iupwork-feed-detail-item.dto';
import { IUpworkFeedItemDTO } from '../../public-common/interfaces/dto/upwork-feed/iupwork-feed-item.dto';
import { IUpworkResponseListFeedsDto } from '../../public-common/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto';
import { IGetWebDocumentsRequestDTO } from '../../public-common/interfaces/dto/web-document/iget-web-documents-request.interface';

export type FeedItem = Omit<IUpworkFeedItemDTO, 'presetId' | 'accountId' | 'id' | 'url'> & { feedId: string };

export type ResponseGetFeeds = IApiResponseGenericDTO<IUpworkResponseListFeedsDto>;
export type ResponseGetFeedById = IApiResponseGenericDTO<IUpworkFeedDetailItemDTO>;

export type RequestGetFeeds = {
  accessToken: string,
  values: IGetWebDocumentsRequestDTO,
};
export type RequestGetFeedById = {
  accessToken: string,
  id: string,
};
