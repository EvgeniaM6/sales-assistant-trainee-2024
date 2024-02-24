import Select, { SingleValue } from 'react-select';
import { useGetFeedsMutation } from '../../redux/feedsApi';
import { useContext, useEffect, useState } from 'react';
import { IPaginatedResultDTO } from '../../../public-common/interfaces/dto/common/ipaginated-result.interface';
import { IUpworkFeedItemDTO } from '../../../public-common/interfaces/dto/upwork-feed/iupwork-feed-item.dto';
import Spin from '../Spin/Spin';
import { ThemeContext } from '../../../App';
import { FeedsPageSizeOption } from '../../models';
import { useAppDispatch } from '../../hooks';
import { setPageNumber, setPageSize } from '../../store/feedsSlice';
import FeedsPaginationPages from './FeedsPaginationPages';

function FeedsPagination() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const [
    { pageNumber, pageSize, totalCount },
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

  const pagesOptions: FeedsPageSizeOption[] = [10, 20].map((num) => ({ value: num, label: num }));

  const handleChangePageSize = (newValue: SingleValue<FeedsPageSizeOption>) => {
    if (!newValue) return;
    dispatch(setPageNumber(1));
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
      <FeedsPaginationPages />
    </div>
  );
}

export default FeedsPagination;
