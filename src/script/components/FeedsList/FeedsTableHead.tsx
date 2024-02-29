import { Table, flexRender } from '@tanstack/react-table';
import { FeedItem } from '../../models';
import { DateInput, KeywordsSelect, ReviewSelect, ScoreSelect, TitleInput } from './tableSearch';

function FeedsTableHead({ table }: {
  table: Table<FeedItem>;
}) {
  return (
    <thead className='feeds-table__head'>
      {table.getHeaderGroups().map((headerGroup) => (
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
                  className='feeds-table__cell feeds-table__head-cell head-cell'
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
                  {isTitle && <TitleInput />}
                  {isPublished && <DateInput />}
                  {(headerId === 'keywords') && <KeywordsSelect />}
                  {isScore && <ScoreSelect />}
                  {isReview && <ReviewSelect />}
                </th>
              );
            })
          }
        </tr>
      ))}
    </thead>
  );
}

export default FeedsTableHead;
