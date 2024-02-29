import { useContext, useState } from 'react';
import Select, { OptionProps } from 'react-select';
import { ThemeContext } from '../../../../App';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { UpworkFeedSearchBy } from '../../../../public-common/enums/upwork-feed/upwork-feed-search-by.enum';
import { setSearchParam } from '../../../store/feedsSlice';
import { ISearchParameterDTO } from '../../../../public-common/interfaces/dto/common/isearch-parameter.interface';
import { SelectOptionFeeds } from '../../../models';

function FilterSelect({ searchByVal, optionsArr }: {
  searchByVal: UpworkFeedSearchBy,
  optionsArr: SelectOptionFeeds[],
}) {
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);

  const { searchParameters } = useAppSelector((store) => store.feeds);
  const searchParam = searchParameters?.find(
    ({ searchBy }) => searchBy === searchByVal
  );
  const [currentOptionsArr, setCurrentOptionsArr] = useState<string[]>((searchParam?.searchQuery as string[]) || ['all']);

  const allItemsOption = { value: 'all', label: 'All' };

  const allOptionsArr: SelectOptionFeeds[] = [allItemsOption, ...optionsArr];
  const currentSelectedAmountStr = `${currentOptionsArr.length} selected`;
  const amountOption: SelectOptionFeeds = { value: currentSelectedAmountStr, label: currentSelectedAmountStr };
  const isAllSelected = currentOptionsArr[0] === 'all' || !currentOptionsArr.length;
  const defaultOption: SelectOptionFeeds = isAllSelected ? allItemsOption : amountOption;

  const filterByVal = (): void => {
    const isAllSelected = !searchParam && currentOptionsArr[0] === 'all';
    if (isAllSelected) return;

    if (!currentOptionsArr.length) {
      setCurrentOptionsArr([allItemsOption.value]);
      if (searchParam && searchParam.searchQuery && searchParam.searchQuery[0] !== 'all') {
        dispatch(setSearchParam({ searchBy: searchByVal, searchQuery: [] }));
      }
      return;
    }

    const newSearchParameter: Required<ISearchParameterDTO<UpworkFeedSearchBy>> = {
      searchBy: searchByVal,
      searchQuery: currentOptionsArr.filter((val) => val !== 'all'),
    };

    dispatch(setSearchParam(newSearchParameter));
  };

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
      defaultValue={defaultOption}
      onBlur={filterByVal}
      placeholder={''}
      className={`react-select-container ${theme}`}
      classNamePrefix='react-select'
      components={{ Option: CustomOption }}
    />
  );
}

export default FilterSelect;
