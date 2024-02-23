import Select, { SingleValue } from 'react-select';
import { useGetFeedsMutation } from '../../redux/feedsApi';
import { useContext, useEffect, useState } from 'react';
import { IPaginatedResultDTO } from '../../../public-common/interfaces/dto/common/ipaginated-result.interface';
import { IUpworkFeedItemDTO } from '../../../public-common/interfaces/dto/upwork-feed/iupwork-feed-item.dto';
import Spin from '../Spin/Spin';
import { ThemeContext } from '../../../App';
import { FeedsPageSizeOption } from '../../models';
import { useAppDispatch } from '../../hooks';
import { setPageSize } from '../../store/feedsSlice';

function FeedsPagination() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();

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

  const pagesOptions: FeedsPageSizeOption[] = [10, 20].map((num) => ({ value: num, label: num }));

  const handleChangePageSize = (newValue: SingleValue<FeedsPageSizeOption>) => {
    if (!newValue) return;
    dispatch(setPageSize(newValue.value));
  };

  return (
    <div className={`feeds__pagination feeds-pagination ${theme}`}>
      <div className='feeds-pagination__info info'>
        <span>Items shown:</span>
        <span className='info__bold'>{` ${countOnPage - pageSize + 1}-${countOnPage} `}</span>
        <span>out of</span>
        <span className='info__bold'>{` ${totalCount}`}</span>
      </div>
      <div className={`feeds-pagination__divider ${theme}`}></div>
      <div className='feeds-pagination__page-size'>
        <span>Items per page</span>
        {isLoading && <Spin isInset={true} />}
        {!isLoading && data && <Select
          options={pagesOptions}
          placeholder={''}
          defaultValue={pagesOptions.find(({ value }) => value === data.data.items.pageSize)}
          menuPlacement='auto'
          className={`react-select-container ${theme}`}
          classNamePrefix='react-select'
          onChange={handleChangePageSize}
        />}
      </div>
      <div className='feeds-pagination__pages'>
        <div className='feeds-pagination__page pagination'>
          <button className={`pagination__item pagination__btn ${theme}`} disabled>
            <span className={`pagination__btn-icon first ${theme}`}></span>
          </button>
        </div>
        <div className='feeds-pagination__page pagination'>
          <button className={`pagination__item pagination__btn ${theme}`} disabled>
            <span className={`pagination__btn-icon previous ${theme}`}></span>
          </button>
        </div>
        {pagesArr.map((page) => (
          <div className='feeds-pagination__page pagination' key={page}>
            <button
              className={`pagination__item pagination__btn ${page === pageNumber ? 'btn-secondary' : ''} ${theme}`}
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
          <button className={`pagination__item pagination__btn ${theme}`}>{totalPages}</button>
        </div>
        <div className='feeds-pagination__page pagination'>
          <button className={`pagination__item pagination__btn ${theme}`}>
            <span className={`pagination__btn-icon next ${theme}`}></span>
          </button>
        </div>
        <div className='feeds-pagination__page pagination'>
          <button className={`pagination__item pagination__btn ${theme}`}>
            <span className={`pagination__btn-icon last ${theme}`}></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedsPagination;
