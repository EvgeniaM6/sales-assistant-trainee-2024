import { IUpworkFeedItemDTO } from '../../../public-common/interfaces/dto/upwork-feed/iupwork-feed-item.dto';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns } from './feedColumns';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../constants';
import { FeedItem } from '../../models/feed.model';

function FeedsTable({ mockFeedsList }: { mockFeedsList: IUpworkFeedItemDTO[] }) {
  const navigate = useNavigate();

  const data: FeedItem[] = mockFeedsList.map((feed) => ({
    feedId: feed.id || '',
    url: feed.url,
    title: feed.title,
    published: feed.published,
    keywords: feed.keywords,
    score: feed.score,
    matchedCases: feed.matchedCases,
    matchedBlogs: feed.matchedBlogs,
    review: feed.review,
  }));

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const openFeedById = (id: string) => {
    navigate(`/${PageRoutes.Feed}/${id}`);
  };

  return (
    <div className='feeds__content'>
      <table className='feeds__table feeds-table'>
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
                      {(isTitle || isPublished) && (
                        <input type={isTitle ? 'text' : 'date'} />
                      )}
                      {(headerId === 'keywords' || isScore || isReview) && (
                        <select name="" id="">
                          {isReview && <option>All</option>}
                        </select>
                      )}
                    </th>
                  );
                })
              }
            </tr>
          ))}
        </thead>
        <tbody className='feeds-table__body'>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className='feeds-table__row'>
              {row.getVisibleCells()
                .filter((cell) => {
                  const columnId = cell.column.id;
                  const haveToSkip = columnId === 'feedId' || columnId === 'url';
                  return !haveToSkip;
                })
                .map((cell) => (
                  <td
                    key={cell.id}
                    className='feeds-table__cell'
                    onClick={() => openFeedById(cell.row.getValue('feedId'))}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeedsTable;
