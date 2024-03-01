import { Fragment, useMemo } from 'react';
import { Table, flexRender } from '@tanstack/react-table';
import { FeedItem, CustomFilterMeta } from '../../models';
import { ColumnSort, TitleInput } from './tableSearch';
import { UpworkFeedSearchBy } from '../../../public-common/enums/upwork-feed/upwork-feed-search-by.enum';
import { useGetFeedsMutation } from '../../redux/feedsApi';
import { UpworkFeedSortBy } from '../../../public-common/enums/upwork-feed/upwork-feed-sort-by.enum';

function FeedsTableHead({ table }: {
  table: Table<FeedItem>;
}) {
  const { data: feedsData } = useGetFeedsMutation({ fixedCacheKey: 'feedsCacheKey' })[1];

  const options = useMemo(() => ({
    [UpworkFeedSearchBy.Review]: [
      { value: 'Like', label: 'Like' },
      { value: 'Dislike', label: 'Dislike' },
    ],
    [UpworkFeedSearchBy.Keywords]: feedsData?.data.keywordsOptions ?? [],
    [UpworkFeedSearchBy.Score]: feedsData?.data.scoreOptions ?? [],
  }), [feedsData]);

  return (
    <thead className='feeds-table__head'>
      {table.getHeaderGroups().map((headerGroup) => {
        const filteredHeaders = headerGroup.headers.filter((header) => {
          const columnId = header.id;
          const haveToSkip = columnId === 'feedId' || columnId === 'url';
          return !haveToSkip;
        });

        return (
          <Fragment key={headerGroup.id} >
            <tr className='feeds-table__row'>
              {filteredHeaders.map((header) => {
                const headerId = header.id as UpworkFeedSortBy;

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
                      {header.column.getCanSort() ? (
                        <ColumnSort headerId={headerId} />
                      ) : null}
                    </div>
                  </th>
                );
              })}
            </tr>
            <tr className='feeds-table__row'>
              {filteredHeaders.map((header) => {
                const headerId = header.id;

                return (
                  <th
                    key={headerId}
                    className='feeds-table__cell feeds-table__head-cell head-cell filter'
                  >
                    {header.column.getCanFilter() ? <>
                      {header.column.columnDef.meta &&
                        (header.column.columnDef.meta as CustomFilterMeta).filterComponent ? (
                          (header.column.columnDef.meta as CustomFilterMeta).filterComponent(
                            { searchByVal: headerId as UpworkFeedSearchBy, optionsArr: options[headerId] }
                          )
                        ) : <TitleInput />}
                    </> : null}
                  </th>
                );
              })}
            </tr>
          </Fragment>
        );
      })}
    </thead>
  );
}

export default FeedsTableHead;
