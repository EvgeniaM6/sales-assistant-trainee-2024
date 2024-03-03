import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ColumnFilter,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useGetFeedsMutation } from '../../redux/feedsApi';
import Spin from '../Spin/Spin';
import { getFeedColumns } from './feedColumns';
import FeedsTableHead from './FeedsTableHead';
import { ThemeContext } from '../../../App';
import { PageRoutes } from '../../constants';
import { getErrorsArr } from '../../utils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ISearchParameterDTO } from '../../../public-common/interfaces/dto/common/isearch-parameter.interface';
import { setSearchParam } from '../../store/feedsSlice';
import { UpworkFeedSearchBy } from '../../../public-common/enums/upwork-feed/upwork-feed-search-by.enum';

function FeedsTable() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);
  const { data: feedsData, isLoading, error } = useGetFeedsMutation({ fixedCacheKey: 'feedsCacheKey' })[1];

  const { data, columns } = useMemo(() => ({
    columns: getFeedColumns(feedsData),
    data: feedsData?.data.items.items.map((feed) => ({
      feedId: feed.id || '',
      url: feed.url,
      title: feed.title,
      published: feed.published,
      keywords: feed.keywords,
      score: feed.score,
      matchedCases: feed.matchedCases,
      matchedBlogs: feed.matchedBlogs,
      review: feed.review,
    })) ?? [],
  }), [feedsData]);

  const { searchParameters } = useAppSelector((store) => store.feeds);
  const defaultColumnFilters: ColumnFilter[] | undefined = searchParameters?.map(({ searchBy, searchQuery }) => (
    { id: searchBy, value: searchQuery }
  ));
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>(defaultColumnFilters ?? []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters: columnFilters,
      columnVisibility: {
        feedId: false,
        url: false,
      },
    },
  });

  const transformColFiltersToSearchParams = (
    columnFilters: ColumnFilter[]
  ): Required<ISearchParameterDTO<UpworkFeedSearchBy>>[] => {
    return columnFilters
      .filter((columnFilter) => {
        const isNotEmpty = !!(columnFilter.value as string | string[] | undefined)?.length;
        return isNotEmpty;
      })
      .map((columnFilter) => {
        const newSearchParameter: Required<ISearchParameterDTO<UpworkFeedSearchBy>> = {
          searchBy: columnFilter.id as UpworkFeedSearchBy,
          searchQuery: columnFilter.value as string[],
        };
        return newSearchParameter;
      });
  };

  useEffect(() => {
    const newSearchParametersArr = transformColFiltersToSearchParams(columnFilters);
    dispatch(setSearchParam(newSearchParametersArr));
  }, [columnFilters]);

  const openFeedById = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string): void => {
    if ((e.target as HTMLElement).tagName === 'A') return;
    navigate(`/${PageRoutes.Feed}/${id}`);
  };

  return (
    <div className='feeds__content'>
      <table className={`feeds__table feeds-table ${theme}`}>
        <FeedsTableHead
          table={table}
        />
        {!isLoading &&
          <tbody className='feeds-table__body'>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='feeds-table__row' onClick={(e) => openFeedById(e, row.getValue('feedId'))}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='feeds-table__cell'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        }
      </table>
      {isLoading && <Spin isInset={true} />}
      {!!error && <>
        {getErrorsArr(error).map((errMsg) => <ErrorMessage errorMsg={errMsg} key={errMsg} />)}
      </>}
    </div>
  );
}

export default FeedsTable;
