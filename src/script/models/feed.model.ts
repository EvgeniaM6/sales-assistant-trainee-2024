import { IUpworkFeedItemDTO } from '../../public-common/interfaces/dto/upwork-feed/iupwork-feed-item.dto';

export type FeedItem = Omit<IUpworkFeedItemDTO, 'presetId' | 'accountId' | 'id'> & { feedId: string };
