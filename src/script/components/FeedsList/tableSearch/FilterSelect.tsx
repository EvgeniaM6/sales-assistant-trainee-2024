import { useContext, useEffect, useState } from 'react';
import Select, { OptionProps } from 'react-select';
import { ThemeContext } from '../../../../App';
import { ColumnTableData, CustomFilterMeta, SelectOptionFeeds } from '../../../models';

function FilterSelect({ column }: ColumnTableData) {
  const optionsArr = (column.columnDef.meta as CustomFilterMeta)?.options ?? [];

  const { theme } = useContext(ThemeContext);

  const columnFilterValue = column.getFilterValue() as string[] | undefined;

  const [currentOptionsArr, setCurrentOptionsArr] = useState<string[]>(columnFilterValue ?? ['all']);

  const allItemsOption = { value: 'all', label: 'All' };

  const allOptionsArr: SelectOptionFeeds[] = [allItemsOption, ...optionsArr];
  const currentSelectedAmountStr = `${currentOptionsArr.length} selected`;
  const amountOption: SelectOptionFeeds = { value: currentSelectedAmountStr, label: currentSelectedAmountStr };
  const isAllSelected = currentOptionsArr[0] === 'all' || !currentOptionsArr.length;
  const defaultOption: SelectOptionFeeds = isAllSelected ? allItemsOption : amountOption;

  const filterByVal = (): void => {
    const isAllSelected = (!columnFilterValue || !columnFilterValue.length) && currentOptionsArr[0] === 'all';
    if (isAllSelected) return;

    if (!currentOptionsArr.length) {
      setCurrentOptionsArr([allItemsOption.value]);
      return;
    }

    const isSameLength = currentOptionsArr.length === columnFilterValue?.length;
    const isSameArray = isSameLength && currentOptionsArr?.every((option) => (
      !!columnFilterValue?.find((filterValue) => filterValue === option))
    );

    if (isSameArray) return;

    const newSearchQuery = currentOptionsArr.filter((val) => val !== 'all');

    column.setFilterValue(newSearchQuery.length ? newSearchQuery : undefined);
  };

  useEffect(() => {
    const timeout = setTimeout(() => filterByVal(), 500);
    return () => clearTimeout(timeout);
  }, [currentOptionsArr]);

  const handleClick = (data: SelectOptionFeeds) => {
    const isAlreadyChecked = currentOptionsArr.some((optionVal) => optionVal === data.value);
    const isSelectedAll = currentOptionsArr.some((optionVal) => optionVal === 'all');
    const isAllOption = data.value === 'all';

    if (isAlreadyChecked) {
      if (isAllOption) {
        setCurrentOptionsArr([]);
      } else {
        const newOptionsArr = currentOptionsArr.filter((optionVal) => optionVal !== data.value);
        setCurrentOptionsArr(newOptionsArr);
      }
    } else if (isAllOption) {
      if (!currentOptionsArr.length) {
        setCurrentOptionsArr([data.value]);
      } else {
        setCurrentOptionsArr([]);
      }
    } else {
      if (isSelectedAll) {
        const newOptionsArr = [...optionsArr.map((option) => option.value)];
        const newOptionValuesArr = newOptionsArr.filter((optionVal) => optionVal !== 'all' && optionVal !== data.value);
        setCurrentOptionsArr(newOptionValuesArr);
      } else {
        const newOptionsArr = [...currentOptionsArr];
        newOptionsArr.push(data.value);
        setCurrentOptionsArr(newOptionsArr);
      }
    }
  };

  const CustomOption = ({ innerProps, label, data }: OptionProps<SelectOptionFeeds>) => {
    const isAllOption = data.value === 'all';
    const isAllOptionClearable = currentOptionsArr.length > 1 || currentOptionsArr[0] && currentOptionsArr[0] !== 'all';

    const isChecked = currentOptionsArr.some((option) => option === data.value) || currentOptionsArr[0] === 'all';

    return (
      <>
        <div
          {...innerProps}
          onClick={() => handleClick(data)}
          className={`react-select__option ${isAllOption ? 'all' : ''} ${theme}`}
        >
          <input
            className={`react-select__checkbox ${isAllOption && isAllOptionClearable ? 'clear' : ''}`}
            type='checkbox'
            name={data.value}
            id={data.value}
            checked={isChecked}
            readOnly={true}
          />
          <label htmlFor={data.value} className='react-select__label'>{label}</label>
        </div>
        {isAllOption && (
          <div className='react-select__divider-container'>
            <div className='react-select__divider'></div>
          </div>
        )}
      </>
    );
  };

  return (
    <Select
      options={allOptionsArr}
      value={defaultOption}
      placeholder={''}
      className={`react-select-container ${theme}`}
      classNamePrefix='react-select'
      components={{ Option: CustomOption }}
    />
  );
}

export default FilterSelect;
