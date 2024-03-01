import { IApiResponseGenericDTO } from '../../public-common/interfaces/dto/common/iapi-response.interface';
import { IPaginatedRequestDTO } from '../../public-common/interfaces/dto/common/ipaginated-request.interface';
import { IGetAllUpworkFeedRequest } from '../../public-common/interfaces/dto/upwork-feed/iget-all-upwork-feed-request.interface';
import { IUpworkFeedDetailItemDTO } from '../../public-common/interfaces/dto/upwork-feed/iupwork-feed-detail-item.dto';
import { IUpworkFeedItemDTO } from '../../public-common/interfaces/dto/upwork-feed/iupwork-feed-item.dto';
import { IUpworkResponseListFeedsDto } from '../../public-common/interfaces/dto/upwork-feed/iupwork-response-list-feeds.dto';
import { UpworkFeedSearchBy } from '../../public-common/enums/upwork-feed/upwork-feed-search-by.enum';
import { Column, FilterMeta, Table } from '@tanstack/react-table';

export type FeedItem = Omit<IUpworkFeedItemDTO, 'presetId' | 'accountId' | 'id'> & { feedId: string };

export type ResponseGetFeeds = IApiResponseGenericDTO<IUpworkResponseListFeedsDto>;
export type ResponseGetFeedById = IApiResponseGenericDTO<IUpworkFeedDetailItemDTO>;

export type IGetFeedsRequestDTO = IPaginatedRequestDTO & IGetAllUpworkFeedRequest;

export type RequestGetFeeds = {
  accessToken: string,
  values: IGetFeedsRequestDTO,
};

export type RequestGetById = {
  accessToken: string,
  id: string,
};

export type FeedsPageSizeOption = {
  value: number;
  label: number;
};

export type SelectOptionFeeds = {
  value: string;
  label: string;
};

export type SelectProps = {
  searchByVal: UpworkFeedSearchBy,
  optionsArr: SelectOptionFeeds[],
};

export type ColumnData = {
  column: Column<any, unknown>,
};

export type ColumnTableData = ColumnData & {
  table: Table<any>,
};

export interface CustomFilterMeta extends FilterMeta {
  filterComponent: (columnData: ColumnData | ColumnTableData) => JSX.Element;
}
