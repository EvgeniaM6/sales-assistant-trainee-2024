import Select from 'react-select';
import { useGetFeedsMutation } from '../../redux/feedsApi';
import { useEffect, useState } from 'react';
import { IPaginatedResultDTO } from '../../../public-common/interfaces/dto/common/ipaginated-result.interface';
import { IUpworkFeedItemDTO } from '../../../public-common/interfaces/dto/upwork-feed/iupwork-feed-item.dto';
import Spin from '../Spin/Spin';

function FeedsPagination() {
  const [
    { pageNumber, pageSize, totalCount, totalPages },
    setFeedsPage,
  ] = useState<IPaginatedResultDTO<IUpworkFeedItemDTO>>({
    totalCount: 0,
    totalPages: 0,
    pageNumber: 0,
    pageSize: 0,
    items: [],
  });

  const { data, isLoading } = useGetFeedsMutation({ fixedCacheKey: 'feedsCacheKey' })[1];

  useEffect(() => {
    if (!data) return;
    setFeedsPage(data.data.items);
  }, [data]);

  const countOnPage = pageNumber * pageSize;

  const pagesArr: number[] = [];
  for (let i = 0; i < 5; i++) {
    pagesArr.push(pageNumber + i);
  }

  const handleClickPage = (page: string) => {
    console.log(page);
  };

  const pagesOptions = [10, 20].map((num) => ({ value: num, label: num }));

  return (
    <div className="feeds__pagination feeds-pagination">
      <div className="feeds-pagination__info info">
        <span>Items shown:</span>
        <span className='info__bold'>{` ${countOnPage - pageSize + 1}-${countOnPage} `}</span>
        <span>out of</span>
        <span className='info__bold'>{` ${totalCount}`}</span>
      </div>
      <div className="feeds-pagination__divider"></div>
      <div className='feeds-pagination__page-size'>
        <span>Items per page</span>
        {isLoading ? <Spin isInset={true} /> : <Select
          options={pagesOptions}
          placeholder={''}
          defaultValue={pagesOptions.find(({ value }) => value === pageSize)}
          menuPlacement='auto'
        />}
      </div>
      <div className='feeds-pagination__pages'>
        <div className='feeds-pagination__page pagination'>
          <button className='pagination__item pagination__btn' disabled>
            <span className='pagination__btn-icon first'></span>
          </button>
        </div>
        <div className='feeds-pagination__page pagination'>
          <button className='pagination__item pagination__btn' disabled>
            <span className='pagination__btn-icon previous'></span>
          </button>
        </div>
        {pagesArr.map((page) => (
          <div className='feeds-pagination__page pagination' key={page}>
            <button
              className={`pagination__item pagination__btn ${page === pageNumber ? 'btn-secondary' : ''}`}
              onClick={() => handleClickPage(`${page}`)}
            >
              {page}
            </button>
          </div>
        ))}
        <div className='feeds-pagination__page pagination'>
          <span className='pagination__item'>{'...'}</span>
        </div>
        <div className='feeds-pagination__page pagination'>
          <button className='pagination__item pagination__btn'>{totalPages}</button>
        </div>
        <div className='feeds-pagination__page pagination'>
          <button className='pagination__item pagination__btn'>
            <span className='pagination__btn-icon next'></span>
          </button>
        </div>
        <div className='feeds-pagination__page pagination'>
          <button className='pagination__item pagination__btn'>
            <span className='pagination__btn-icon last'></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedsPagination;
