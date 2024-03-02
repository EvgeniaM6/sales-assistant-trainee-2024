import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { ThemeContext } from '../../../../App';
import { UpworkFeedSearchBy } from '../../../../public-common/enums/upwork-feed/upwork-feed-search-by.enum';
import { ISearchParameterDTO } from '../../../../public-common/interfaces/dto/common/isearch-parameter.interface';
import { setSearchParam } from '../../../store/feedsSlice';
import { ColumnData } from '../../../models';

function DefaultFilterInput({ column }: ColumnData) {
  const columnId = column.id as UpworkFeedSearchBy;

  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);

  const { searchParameters } = useAppSelector((store) => store.feeds);
  const filterValue = searchParameters?.find(({ searchBy }) => searchBy === columnId);
  const [currentFilterValue, setCurrentFilterValue] = useState(filterValue?.searchQuery || '');

  const filterByValue = () => {
    if (filterValue?.searchQuery === currentFilterValue || (!filterValue && !currentFilterValue)) return;

    const newSearchParameter: Required<ISearchParameterDTO<UpworkFeedSearchBy>> = {
      searchBy: columnId,
      searchQuery: currentFilterValue,
    };

    dispatch(setSearchParam(newSearchParameter));
  };

  useEffect(() => {
    const timeout = setTimeout(() => filterByValue(), 500);
    return () => clearTimeout(timeout);
  }, [currentFilterValue]);

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurrentFilterValue(e.target.value);
  };

  const clearValue = () => {
    setCurrentFilterValue('');
    dispatch(setSearchParam({ searchBy: columnId, searchQuery: '' }));
  };

  return (
    <div className='head-cell__input-container'>
      <input
        type='text'
        className={`head-cell__input ${theme}`}
        id={columnId}
        value={currentFilterValue}
        onChange={handleChangeInput}
        onBlur={filterByValue}
      />
      {!!currentFilterValue && <button type='button' className='filter-clear' onClick={clearValue} />}
    </div>
  );
}

export default DefaultFilterInput;
