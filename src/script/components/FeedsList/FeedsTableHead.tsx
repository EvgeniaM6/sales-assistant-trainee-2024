import { Fragment } from 'react';
import { Table, flexRender } from '@tanstack/react-table';
import { FeedItem, CustomFilterMeta } from '../../models';
import { ColumnSort, DefaultFilterInput } from './tableSearch';
import { UpworkFeedSortBy } from '../../../public-common/enums/upwork-feed/upwork-feed-sort-by.enum';

function FeedsTableHead({ table }: {
  table: Table<FeedItem>;
}) {
  return (
    <thead className='feeds-table__head'>
      {table.getHeaderGroups().map((headerGroup) => {
        const { headers } = headerGroup;

        return (
          <Fragment key={headerGroup.id} >
            <tr className='feeds-table__row'>
              {headers.map((header) => {
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
              {headers.map((header) => (
                <th
                  key={header.id}
                  className='feeds-table__cell feeds-table__head-cell head-cell filter'
                >
                  {header.column.getCanFilter() ? (
                    <>
                      {header.column.columnDef?.meta &&
                        (header.column.columnDef?.meta as CustomFilterMeta).filterComponent ? (
                          (header.column.columnDef?.meta as CustomFilterMeta).filterComponent({
                            column: header.column,
                            table,
                          })
                        ) : <DefaultFilterInput column={header.column} />}
                    </>
                  ) : null}
                </th>
              ))}
            </tr>
          </Fragment>
        );
      })}
    </thead>
  );
}

export default FeedsTableHead;
