import { createColumnHelper } from '@tanstack/react-table';
import { ReviewType } from '../../../public-common/enums/upwork-feed/review-type.enum';
import { getTimeFromString } from '../../utils/getTimeFromString';
import { FeedItem } from '../../models';
import { NavLink } from 'react-router-dom';
import { PageRoutes } from '../../constants';

const columnHelper = createColumnHelper<FeedItem>();

export const columns = [
  columnHelper.accessor('feedId', {}),
  columnHelper.accessor('title', {
    header: 'Title',
    cell: (info) => {
      const title = info.getValue();
      return (
        <NavLink to={`/${PageRoutes.Feed}/${info.row.getValue('feedId')}`}>
          {title}
        </NavLink>
      );
    },
  }),
  columnHelper.accessor((row) => row.published, {
    id: 'published',
    header: 'Published',
    cell: (info) => {
      const timeStr = info.getValue();
      return getTimeFromString(timeStr);
    },
  }),
  columnHelper.accessor('keywords', {
    header: 'Keywords',
    cell: (info) => {
      const keywordsArr = info.getValue();
      return (
        <div className='feeds-table__cell-keywords'>
          {keywordsArr.map((keyword) => (
            <span key={keyword} className='feeds-table__keyword'>{keyword}</span>
          ))}
        </div>
      );
    },
  }),
  columnHelper.accessor('score', {
    header: 'Score',
  }),
  columnHelper.accessor('review', {
    header: 'Reaction',
    cell: (info) => {
      const review = info.getValue();
      if (review) {
        const isLike = review.type === ReviewType.Like;
        return <span className={`feeds-table__reaction ${isLike ? 'like' : 'dislike'}`}></span>;
      }
      return <span></span>;
    },
  }),
  columnHelper.accessor('matchedCases', {
    id: 'matched-cases',
    header: 'Matched cases',
  }),
  columnHelper.accessor('matchedBlogs', {
    id: 'matched-blogs',
    header: 'Matched blogs',
  }),
];
