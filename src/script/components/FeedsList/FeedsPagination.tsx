import Select, { SingleValue } from 'react-select';
import { useGetFeedsMutation } from '../../redux/feedsApi';
import { useContext, useMemo } from 'react';
import Spin from '../Spin/Spin';
import { ThemeContext } from '../../../App';
import { FeedsPageSizeOption } from '../../models';
import { useAppDispatch } from '../../hooks';
import { setPageNumber, setPageSize } from '../../store/feedsSlice';
import FeedsPaginationPages from './FeedsPaginationPages';

function FeedsPagination() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetFeedsMutation({ fixedCacheKey: 'feedsCacheKey' })[1];

  const { pageNumber, pageSize, totalCount } = useMemo(() => ({
    totalCount: data?.data.items.totalCount ?? 0,
    totalPages: data?.data.items.totalPages ?? 0,
    pageNumber: data?.data.items.pageNumber ?? 0,
    pageSize: data?.data.items.pageSize ?? 0,
  }), [data]);

  const countOnPage = pageNumber * pageSize;

  const pagesOptions: FeedsPageSizeOption[] = [10, 20].map((num) => ({ value: num, label: num }));

  const handleChangePageSize = (newValue: SingleValue<FeedsPageSizeOption>) => {
    if (!newValue) return;
    dispatch(setPageNumber(1));
    dispatch(setPageSize(newValue.value));
  };

  return (
    <div className={`feeds__pagination feeds-pagination ${theme}`}>
      <div className='feeds-pagination__details'>
        <div className='feeds-pagination__info info'>
          <span className='feeds-pagination__text'>Items shown:</span>
          <span className='info__bold'>{` ${countOnPage - pageSize + 1}-${Math.min(countOnPage, totalCount)} `}</span>
          <span>out of</span>
          <span className='info__bold'>{` ${totalCount}`}</span>
        </div>
        <div className={`feeds-pagination__divider ${theme}`}></div>
        <div className='feeds-pagination__page-size'>
          <span className='feeds-pagination__text'>Items per page</span>
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
      </div>
      <FeedsPaginationPages />
    </div>
  );
}

export default FeedsPagination;
