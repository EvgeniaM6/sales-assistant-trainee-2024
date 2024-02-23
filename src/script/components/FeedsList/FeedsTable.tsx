import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { PageRoutes } from '../../constants';
import { getClassNameByScore } from '../../utils';

function FeedsTable() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { data: feedsData, isLoading } = useGetFeedsMutation({ fixedCacheKey: 'feedsCacheKey' })[1];

  const [data, setData] = useState<FeedItem[]>([]);

  useEffect(() => {
    if (!feedsData) return;

    const newData: FeedItem[] = feedsData.data.items.items.map((feed) => ({
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

    setData([...newData]);
  }, [feedsData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const openFeedById = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string): void => {
    if ((e.target as HTMLElement).tagName === 'A') return;
    navigate(`/${PageRoutes.Feed}/${id}`);
  };

  return (
    <div className='feeds__content'>
      {isLoading ? <Spin isInset={true} /> :
        <table className={`feeds__table feeds-table ${theme}`}>
          <FeedsTableHead
            table={table}
          />
          <tbody className='feeds-table__body'>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='feeds-table__row' onClick={(e) => openFeedById(e, row.getValue('feedId'))}>
                {row.getVisibleCells()
                  .filter((cell) => {
                    const columnId = cell.column.id;
                    const haveToSkip = columnId === 'feedId' || columnId === 'url';
                    return !haveToSkip;
                  })
                  .map((cell) => {
                    const id = cell.column.id;
                    if (id === 'score') {
                      const score = cell.getValue() as number;
                      const scoreClassName = getClassNameByScore(score);
                      return (
                        <td
                          key={cell.id}
                          className='feeds-table__cell'
                        >
                          <span className={`feeds-table__cell-score score-${scoreClassName}`}>
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
