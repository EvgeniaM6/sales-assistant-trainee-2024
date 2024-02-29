import { useMemo } from 'react';
import { Table, flexRender } from '@tanstack/react-table';
import { FeedItem } from '../../models';
import { DateInput, FilterSelect, TitleInput } from './tableSearch';
import { UpworkFeedSearchBy } from '../../../public-common/enums/upwork-feed/upwork-feed-search-by.enum';
import { useGetFeedsMutation } from '../../redux/feedsApi';

function FeedsTableHead({ table }: {
  table: Table<FeedItem>;
}) {
  const { data: feedsData } = useGetFeedsMutation({ fixedCacheKey: 'feedsCacheKey' })[1];

  const reviewOptions = [
    { value: 'Like', label: 'Like' },
    { value: 'Dislike', label: 'Dislike' },
  ];

  const { keywordsOptions, scoreOptions } = useMemo(() => ({
    keywordsOptions: feedsData?.data.keywordsOptions ?? [],
    scoreOptions: feedsData?.data.scoreOptions ?? [],
  }), [feedsData]);

  return (
    <thead className='feeds-table__head'>
      {table.getHeaderGroups().map((headerGroup) => (
        <>
          <tr key={headerGroup.id} className='feeds-table__row'>
            {headerGroup.headers
              .filter((header) => {
                const columnId = header.id;
                const haveToSkip = columnId === 'feedId' || columnId === 'url';
                return !haveToSkip;
              })
              .map((header) => {
                const headerId = header.id;
                const isTitle = headerId === 'title';
                const isPublished = headerId === 'published';
                const isScore = headerId === 'score';
                const isReview = headerId === 'review';
                return (
                  <th
                    key={headerId}
                    className='feeds-table__cell feeds-table__head-cell head-cell title'
                  >
                    <div className='head-cell__title'>
                      <div className={`head-cell__title-text ${headerId}`}>
                        {header.isPlaceholder ?
                          null :
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </div>
                      {(isTitle || isPublished || isScore || isReview) && (
                        <div className='head-cell__sort'>
                          <button className='head-cell__sort-btn'>
                            <span className='head-cell__sort-btn-icon'></span>
                          </button>
                        </div>
                      )}
                    </div>
                  </th>
                );
              })
            }
          </tr>
          <tr key={headerGroup.id} className='feeds-table__row'>
            {headerGroup.headers
              .filter((header) => {
                const columnId = header.id;
                const haveToSkip = columnId === 'feedId' || columnId === 'url';
                return !haveToSkip;
              })
              .map((header) => {
                const headerId = header.id;
                const isTitle = headerId === 'title';
                const isPublished = headerId === 'published';
                const isScore = headerId === 'score';
                const isReview = headerId === 'review';
                return (
                  <th
                    key={headerId}
                    className='feeds-table__cell feeds-table__head-cell head-cell filter'
                  >
                    {isTitle && <TitleInput />}
                    {isPublished && <DateInput />}
                    {(headerId === 'keywords') && (
                      <FilterSelect searchByVal={UpworkFeedSearchBy.Keywords} optionsArr={keywordsOptions} />
                    )}
                    {isScore && <FilterSelect searchByVal={UpworkFeedSearchBy.Score} optionsArr={scoreOptions} />}
                    {isReview && <FilterSelect searchByVal={UpworkFeedSearchBy.Review} optionsArr={reviewOptions} />}
                  </th>
                );
              })
            }
          </tr>
        </>
      ))}
    </thead>
  );
}

export default FeedsTableHead;
