import { useContext, useState } from 'react';
import Select, { SingleValue } from 'react-select';
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

  const feedsValues = useAppSelector((store) => store.feeds);
  const searchParam = feedsValues.searchParameters?.find(
    ({ searchBy }) => searchBy === searchByVal
  );
  const [currentOptionsArr, setCurrentOptionsArr] = useState<string[]>((searchParam?.searchQuery as string[]) || ['all']);

  const allItemsOption = { value: 'all', label: 'All' };

  const allOptionsArr: SelectOptionFeeds[] = [allItemsOption, ...optionsArr];
  const defaultOption = allOptionsArr.find(({ value }) => value === currentOptionsArr[0]);

  const filterByVal = (): void => {
    const isAllSelected = !searchParam && currentOptionsArr[0] === 'all';
    const isSameSelected = (searchParam?.searchQuery || [])[0] === currentOptionsArr[0];
    if (isAllSelected || isSameSelected) return;

    const newSearchParameter: Required<ISearchParameterDTO<UpworkFeedSearchBy>> = {
      searchBy: searchByVal,
      searchQuery: currentOptionsArr.filter((val) => val !== 'all'),
    };

    dispatch(setSearchParam(newSearchParameter));
  };

  const handleChange = (
    newVal: SingleValue<SelectOptionFeeds>
  ): void => {
    if (!newVal) {
      setCurrentOptionsArr(['all']);
    } else {
      setCurrentOptionsArr([newVal.value]);
    }
  };

  return (
    <Select
      options={allOptionsArr}
      defaultValue={defaultOption}
      onBlur={filterByVal}
      onChange={handleChange}
      placeholder={''}
      isClearable={true}
      className={`react-select-container ${theme}`}
      classNamePrefix='react-select'
    />
  );
}

export default FilterSelect;
