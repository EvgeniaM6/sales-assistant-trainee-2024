import { useContext, useEffect } from 'react';
import FeedsTable from './FeedsTable';
import FeedsPagination from './FeedsPagination';
import { useGetFeedsMutation } from '../../redux/feedsApi';
import { getLocalStorageTokens } from '../../utils';
import { useAppSelector } from '../../hooks';
import { RequestGetFeeds } from '../../models';
import { ThemeContext } from '../../../App';

function FeedsBlock() {
  const { theme } = useContext(ThemeContext);
  const feedsValues = useAppSelector((store) => store.feeds);

  const [getFeeds] = useGetFeedsMutation({ fixedCacheKey: 'feedsCacheKey' });

  const refresh = (): void => {
    const { accessToken } = getLocalStorageTokens();
    const getFeedsReq: RequestGetFeeds = {
      accessToken,
      values: feedsValues,
    };
    getFeeds(getFeedsReq);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <main className='feeds__main'>
      <div className='feeds__top'>
        <div className='feeds__title'>
          <h2 className='feeds__title-text'>Upwork feed</h2>
        </div>
        <div className='feeds__refresh'>
          <button className={`feeds__refresh-btn btn-secondary ${theme}`} onClick={refresh}>
            <span className='feeds__refresh-btn-icon'></span>
            <span className='feeds__refresh-btn-text'>Refresh RSS</span>
          </button>
        </div>
      </div>
      <div className='feeds__list'>
        <FeedsTable/>
        <FeedsPagination />
      </div>
    </main>
  );
}

export default FeedsBlock;
