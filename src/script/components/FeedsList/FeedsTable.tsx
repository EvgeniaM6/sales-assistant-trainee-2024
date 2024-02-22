import { useContext, useEffect, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useGetFeedsMutation } from '../../redux/feedsApi';
import Spin from '../Spin/Spin';
import { columns } from './feedColumns';
import FeedsTableHead from './FeedsTableHead';
import { FeedItem } from '../../models';
import { ThemeContext } from '../../../App';

function FeedsTable() {
  const { theme } = useContext(ThemeContext);
  const { data: feedsData, isLoading } = useGetFeedsMutation({ fixedCacheKey: 'feedsCacheKey' })[1];

  const [data, setData] = useState<FeedItem[]>([]);

  useEffect(() => {
    if (!feedsData) return;

    const newData: FeedItem[] = feedsData.data.items.items.map((feed) => ({
      feedId: feed.id || '',
      title: feed.title,
      published: feed.published,
      keywords: feed.keywords,
      score: feed.score,
      matchedCases: feed.matchedCases,
      matchedBlogs: feed.matchedBlogs,
      review: feed.review,
    }));

    setData([...newData]);
  }, [feedsData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='feeds__content'>
      {isLoading ? <Spin isInset={true} /> :
        <table className={`feeds__table feeds-table ${theme}`}>
          <FeedsTableHead
            table={table}
          />
          <tbody className='feeds-table__body'>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='feeds-table__row'>
                {row.getVisibleCells()
                  .filter((cell) => {
                    const columnId = cell.column.id;
                    const haveToSkip = columnId === 'feedId';
                    return !haveToSkip;
                  })
                  .map((cell) => {
                    const id = cell.column.id;
                    if (id === 'score') {
                      const score = cell.getValue() as number;
                      return (
                        <td
                          key={cell.id}
                          className='feeds-table__cell'
                        >
                          <span
                            className={'feeds-table__cell-score'}
                            style={{
                              backgroundColor: `hsl(${score > 250 ? 180 : score * 180 / 250}deg 100% ${theme === 'dark'? '30%' : '100%'})`,
                            }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </span>
                        </td>
                      );
                    }

                    return (
                      <td
                        key={cell.id}
                        className='feeds-table__cell'
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })
                }
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}

export default FeedsTable;
