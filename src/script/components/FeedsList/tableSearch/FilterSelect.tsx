import { useContext, useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { ThemeContext } from '../../../../App';
import { ColumnTableData, CustomFilterMeta, SelectOptionFeeds } from '../../../models';
import CustomOption from './CustomOption';
import CustomValueContainer from './CustomValueContainer';

function FilterSelect({ column }: ColumnTableData) {
  const optionsArr = (column.columnDef.meta as CustomFilterMeta)?.options ?? [];
  const allItemsOption = { value: 'all', label: 'All' };
  const allOptionsArr: SelectOptionFeeds[] = [allItemsOption, ...optionsArr];

  const { theme } = useContext(ThemeContext);

  const columnFilterValue = column.getFilterValue() as string[] | undefined;

  const filteredOptions = allOptionsArr.filter(
    ({ value }) => columnFilterValue?.some((filterVal) => value === filterVal)
  );
  const defaultOptions = columnFilterValue ? filteredOptions : [allItemsOption];

  const [currentOptionsArr, setCurrentOptionsArr] = useState<MultiValue<SelectOptionFeeds>>(defaultOptions);

  const filterByVal = (): void => {
    if (!currentOptionsArr.length) {
      setCurrentOptionsArr([allItemsOption]);
      return;
    }

    const newSearchQuery = currentOptionsArr.map(({ value }) => value).filter((val) => val !== 'all');
    column.setFilterValue(newSearchQuery?.length ? newSearchQuery : undefined);
  };

  useEffect(() => {
    const timeout = setTimeout(() => filterByVal(), 500);
    return () => clearTimeout(timeout);
  }, [currentOptionsArr]);

  return (
    <Select
      options={allOptionsArr}
      value={currentOptionsArr}
      onChange={setCurrentOptionsArr}
      placeholder={''}
      isMulti
      className={`react-select-container ${theme}`}
      classNamePrefix='react-select'
      components={{
        Option: CustomOption,
        ValueContainer: CustomValueContainer,
      }}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      isClearable={false}
      styles={{
        valueContainer: (base) => ({
          ...base,
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap',
        }),
      }}
    />
  );
}

export default FilterSelect;
