import { useContext, useMemo } from 'react';
import { ThemeContext } from '../../../App';
import { useGetFeedsMutation } from '../../redux/feedsApi';
import Spin from '../Spin/Spin';
import PageNavBtn from './PageNavBtn';
import { getPagesList } from '../../utils';
import { useAppDispatch } from '../../hooks';
import { setPageNumber } from '../../store/feedsSlice';

function FeedsPaginationPages() {
  const { theme } = useContext(ThemeContext);
  const { data, isLoading } = useGetFeedsMutation({ fixedCacheKey: 'feedsCacheKey' })[1];
  const dispatch = useAppDispatch();

  const { pageNumber, totalPages, pagesArr } = useMemo(() => ({
    pageNumber: data?.data.items.pageNumber ?? 0,
    totalPages: data?.data.items.totalPages ?? 0,
    pagesArr: getPagesList(data?.data.items.pageNumber ?? 0, data?.data.items.totalPages ?? 0),
  }), [data]);

  const handleClickPage = (page: number) => {
    dispatch(setPageNumber(page));
  };

  return (
    <div className='feeds-pagination__pages'>
      <PageNavBtn role='first' pageNumber={pageNumber} totalPages={totalPages} />
      <PageNavBtn role='previous' pageNumber={pageNumber} totalPages={totalPages} />
      {isLoading && <Spin isInset={true} />}
      {!isLoading && data && <>
        {pagesArr.map((page) => {
          if (page === 'ellipsis' || page === 'ellipsis-last') {
            return (
              <div className='feeds-pagination__page pagination' key={page}>
                <span className='pagination__item'>{'...'}</span>
              </div>
            );
          }
          return (
            <div className='feeds-pagination__page pagination' key={page}>
              <button
                className={`pagination__item pagination__btn ${page === pageNumber ? 'btn-secondary' : ''} ${theme}`}
                onClick={() => handleClickPage(page as number)}
              >
                {page}
              </button>
            </div>
          );
        })}
      </>}
      <PageNavBtn role='next' pageNumber={pageNumber} totalPages={totalPages} />
      <PageNavBtn role='last' pageNumber={pageNumber} totalPages={totalPages} />
    </div>
  );
}

export default FeedsPaginationPages;
