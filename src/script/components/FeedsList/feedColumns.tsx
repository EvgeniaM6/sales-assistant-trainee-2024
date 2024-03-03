import { ColumnDef } from '@tanstack/react-table';
import { ReviewType } from '../../../public-common/enums/upwork-feed/review-type.enum';
import { getTimeFromString } from '../../utils/getTimeFromString';
import { FeedItem, ResponseGetFeeds } from '../../models';
import { IReviewDTO } from '../../../public-common/interfaces/dto/upwork-feed/ireview.dto';
import { DateInput, FilterSelect } from './tableSearch';
import { UpworkFeedSearchBy } from '../../../public-common/enums/upwork-feed/upwork-feed-search-by.enum';
import { getClassNameByScore } from '../../utils';

export const getFeedColumns = (feedsData: ResponseGetFeeds | undefined): ColumnDef<FeedItem>[] => {
  const options = {
    [UpworkFeedSearchBy.Review]: [
      { value: 'Like', label: 'Like' },
      { value: 'Dislike', label: 'Dislike' },
    ],
    [UpworkFeedSearchBy.Keywords]: feedsData?.data.keywordsOptions ?? [],
    [UpworkFeedSearchBy.Score]: feedsData?.data.scoreOptions ?? [],
  };

  const columns: ColumnDef<FeedItem>[] = [
    {
      accessorKey: 'feedId',
    },
    {
      accessorKey: 'url',
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: (info) => {
        const title = info.getValue() as string;
        const url: string = info.row.getValue('url');
        return <a href={url} target='_blank' rel="noreferrer">{title}</a>;
      },
    },
    {
      accessorKey: 'published',
      id: 'published',
      header: 'Published',
      cell: (info) => {
        const timeStr = info.getValue() as string;
        return getTimeFromString(timeStr);
      },
      meta: {
        filterComponent: DateInput,
      },
    },
    {
      accessorKey: 'keywords',
      header: 'Keywords',
      cell: (info) => {
        const keywordsArr = info.getValue() as string[];
        return (
          <div className='feeds-table__cell-keywords'>
            {keywordsArr && keywordsArr.map((keyword) => (
              <span key={keyword} className='feeds-table__keyword'>{keyword}</span>
            ))}
          </div>
        );
      },
      enableSorting: false,
      meta: {
        options: options[UpworkFeedSearchBy.Keywords],
        filterComponent: FilterSelect,
      },
    },
    {
      accessorKey: 'score',
      header: 'Score',
      cell: (info) => {
        const score = info.getValue() as number;
        const scoreClassName = getClassNameByScore(score);
        return (
          <span className={`feeds-table__cell-score score-${scoreClassName}`}>
            {score}
          </span>
        );
      },
      meta: {
        options: options[UpworkFeedSearchBy.Score],
        filterComponent: FilterSelect,
      },
    },
    {
      accessorKey: 'review',
      header: 'Reaction',
      cell: (info) => {
        const review = info.getValue() as IReviewDTO;
        if (review) {
          const isLike = review.type === ReviewType.Like;
          return <span className={`feeds-table__reaction ${isLike ? 'like' : 'dislike'}`}></span>;
        }
        return <span></span>;
      },
      meta: {
        options: options[UpworkFeedSearchBy.Review],
        filterComponent: FilterSelect,
      },
    },
    {
      accessorKey: 'matchedCases',
      id: 'matched-cases',
      header: 'Matched cases',
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: 'matchedBlogs',
      id: 'matched-blogs',
      header: 'Matched blogs',
      enableColumnFilter: false,
      enableSorting: false,
    },
  ];

  return columns;
};
