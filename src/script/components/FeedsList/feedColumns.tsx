import { ColumnDef } from '@tanstack/react-table';
import { ReviewType } from '../../../public-common/enums/upwork-feed/review-type.enum';
import { getTimeFromString } from '../../utils/getTimeFromString';
import { FeedItem, ColumnData } from '../../models';
import { useMemo } from 'react';
import { IReviewDTO } from '../../../public-common/interfaces/dto/upwork-feed/ireview.dto';
import { DateInput, FilterSelect } from './tableSearch';

export const getFeedColumns = (): ColumnDef<FeedItem>[] => {
  const columns = useMemo<ColumnDef<FeedItem>[]>(() => [
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
        filterComponent: (columnData: ColumnData) => <DateInput {...columnData} />,
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
        filterComponent: (columnData: ColumnData) => <FilterSelect {...columnData} />,
      },
    },
    {
      accessorKey: 'score',
      header: 'Score',
      meta: {
        filterComponent: (columnData: ColumnData) => <FilterSelect {...columnData} />,
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
        filterComponent: (columnData: ColumnData) => <FilterSelect {...columnData} />,
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
  ], []);

  return columns;
};
