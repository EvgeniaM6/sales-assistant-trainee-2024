import { useEffect } from 'react';
import { IUpworkFeedItemDTO } from '../../../public-common/interfaces/dto/upwork-feed/iupwork-feed-item.dto';
import FeedsTable from './FeedsTable';
import FeedsPagination from './FeedsPagination';
import { useGetFeedsMutation } from '../../redux/feedsApi';
import { getLocalStorageTokens } from '../../utils';
import Spin from '../Spin/Spin';
import { RequestGetFeeds } from '../../models';

function FeedsBlock() {
  const { accessToken } = getLocalStorageTokens();
  const getFeedsReq: RequestGetFeeds = {
    accessToken,
    values: {
      pageSize: 20,
      pageNumber: 1,
    },
  };

  const [getFeeds, { data, isLoading }] = useGetFeedsMutation();

  useEffect(() => {
    getFeeds(getFeedsReq);
  }, []);

  const refresh = (): void => {
    getFeeds(getFeedsReq);
  };

  return (
    <main className='feeds__main'>
      <div className='feeds__top'>
        <div className='feeds__title'>
          <h2 className='feeds__title-text'>Upwork feed</h2>
        </div>
        <div className='feeds__refresh'>
          <button className='feeds__refresh-btn btn-secondary' onClick={refresh}>
            <span className='feeds__refresh-btn-icon'></span>
            <span className='feeds__refresh-btn-text'>Refresh RSS</span>
          </button>
        </div>
      </div>
      <div className='feeds__list'>
        {isLoading && <Spin />}
        {data && !isLoading && <FeedsTable
          items={data.data.items.items as IUpworkFeedItemDTO[]}
          keywordsOptions={data.data.keywordsOptions}
          scoreOptions={data.data.scoreOptions}
        />}
        <FeedsPagination />
      </div>
    </main>
  );
}

export default FeedsBlock;
