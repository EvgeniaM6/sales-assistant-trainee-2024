import { useReducer } from 'react';
import fetchFeeds from './fetchFeeds.json';
import { IUpworkFeedItemDTO } from '../../../public-common/interfaces/dto/upwork-feed/iupwork-feed-item.dto';
import FeedsTable from './FeedsTable';
import FeedsPagination from './FeedsPagination';

function FeedsBlock() {
  const { items: { items }, keywordsOptions, scoreOptions } = fetchFeeds.data;
  const refresh = useReducer(() => ({}), {})[1];

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
        <FeedsTable
          items={items as IUpworkFeedItemDTO[]}
          keywordsOptions={keywordsOptions}
          scoreOptions={scoreOptions}
        />
        <FeedsPagination />
      </div>
    </main>
  );
}

export default FeedsBlock;
