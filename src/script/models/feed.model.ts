import { IApiResponseGenericDTO } from '../../public-common/interfaces/dto/common/iapi-response.interface';
import { IUpworkFeedItemDTO } from '../../public-common/interfaces/dto/upwork-feed/iupwork-feed-item.dto';
import { IUpworkResponseListFeedsDto } from '../../public-common/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto';
import { IGetWebDocumentsRequestDTO } from '../../public-common/interfaces/dto/web-document/iget-web-documents-request.interface';

export type FeedItem = Omit<IUpworkFeedItemDTO, 'presetId' | 'accountId' | 'id'> & { feedId: string };

export type ResponseGetFeeds = IApiResponseGenericDTO<IUpworkResponseListFeedsDto>;

export type RequestGetFeeds = {
  accessToken: string,
  values: IGetWebDocumentsRequestDTO,
};
