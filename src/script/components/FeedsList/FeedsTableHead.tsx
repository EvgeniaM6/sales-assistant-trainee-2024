import { Table, flexRender } from '@tanstack/react-table';
import Select from 'react-select';
import { IOptionInterface } from '../../../public-common/interfaces/dto/common/ioption.interface';
import DateInput from './DataInput';
import { FeedItem } from '../../models';

function FeedsTableHead({ table, keywordsOptions, scoreOptions }: {
  table: Table<FeedItem>;
  keywordsOptions: IOptionInterface[];
  scoreOptions: IOptionInterface[];
}) {
  const reviewOptions = [
    { value: 'all', label: 'All' },
    { value: 'like', label: 'Like' },
    { value: 'dislike', label: 'Dislike' },
  ];

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
                  {isTitle && (
                    <input type='text' className='head-cell__input' />
                  )}
                  {isPublished && <DateInput />}
                  {(headerId === 'keywords') && (
                    <Select
                      options={keywordsOptions}
                      placeholder={''}
                      isClearable={true}
                    />
                  )}
                  {isScore && (
                    <Select
                      options={scoreOptions}
                      placeholder={''}
                      isClearable={true}
                    />
                  )}
                  {isReview && (
                    <Select
                      options={reviewOptions}
                      placeholder={''}
                      isClearable={true}
                    />
                  )}
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
