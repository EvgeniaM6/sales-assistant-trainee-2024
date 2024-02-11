import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { IUpworkFeedItemDTO } from '../../../public-common/interfaces/dto/upwork-feed/iupwork-feed-item.dto';
import { IOptionInterface } from '../../../public-common/interfaces/dto/common/ioption.interface';
import { columns } from './feedColumns';
import { PageRoutes } from '../../constants';
import FeedsTableHead from './FeedsTableHead';
import { FeedItem } from '../../models';

function FeedsTable({ items, keywordsOptions, scoreOptions }: {
  items: IUpworkFeedItemDTO[];
  keywordsOptions: IOptionInterface[];
  scoreOptions: IOptionInterface[];
}) {
  const navigate = useNavigate();

  const defaultData: FeedItem[] = items.map((feed) => ({
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
  const [data] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const openFeedById = (id: string): void => {
    navigate(`/${PageRoutes.Feed}/${id}`);
  };

  return (
    <div className='feeds__content'>
      <table className='feeds__table feeds-table'>
        <FeedsTableHead
          table={table}
          keywordsOptions={keywordsOptions}
          scoreOptions={scoreOptions}
        />
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
