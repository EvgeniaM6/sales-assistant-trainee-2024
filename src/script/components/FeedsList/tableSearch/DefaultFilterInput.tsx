import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../../App';
import { ColumnData } from '../../../models';

function DefaultFilterInput({ column }: ColumnData) {
  const { theme } = useContext(ThemeContext);

  const columnFilter = (column.getFilterValue() ?? '') as string;
  const [currentFilter, setCurrentFilter] = useState(columnFilter);

  const filterByValue = () => {
    if (columnFilter === currentFilter || (!columnFilter && !currentFilter)) return;
    column.setFilterValue(currentFilter);
  };

  useEffect(() => {
    const timeout = setTimeout(() => filterByValue(), 500);
    return () => clearTimeout(timeout);
  }, [currentFilter]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurrentFilter(e.target.value);
  };

  const clearCurrentFilter = (): void => {
    setCurrentFilter('');
  };

  return (
    <div className='head-cell__input-container'>
      <input
        type='text'
        className={`head-cell__input ${theme}`}
        id={column.id}
        value={currentFilter}
        onChange={handleChange}
      />
      {!!currentFilter && (
        <button type='button' className='filter-clear' onClick={clearCurrentFilter} />
      )}
    </div>
  );
}

export default DefaultFilterInput;
