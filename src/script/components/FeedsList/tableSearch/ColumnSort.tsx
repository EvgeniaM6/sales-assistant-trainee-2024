import { UpworkFeedSortBy } from '../../../../public-common/enums/upwork-feed/upwork-feed-sort-by.enum';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { removeSort, setSortBy, setSortDirection } from '../../../store/feedsSlice';
import { SortDirection } from '../../../../public-common/enums/common/sort-direction.enum';

function ColumnSort({ headerId }: { headerId: UpworkFeedSortBy }) {
  const dispatch = useAppDispatch();
  const { sortBy, sortDirection } = useAppSelector((store) => store.feeds);

  const sortFeedsByVal = (val: UpworkFeedSortBy) => {
    if (!sortBy) {
      dispatch(setSortBy(val));
    } else {
      if (val === sortBy) {
        if (sortDirection === SortDirection.ASC) {
          dispatch(setSortDirection(SortDirection.DESC));
        } else {
          dispatch(removeSort());
        }
      } else {
        dispatch(setSortBy(val));
      }
    }
  };

  return (
    <div className='head-cell__sort'>
      <button
        className='head-cell__sort-btn'
        onClick={() => sortFeedsByVal(headerId)}
      >
        <span className={`head-cell__sort-btn-icon ${sortBy === headerId ? sortDirection : ''}`}></span>
      </button>
    </div>
  );
}

export default ColumnSort;
