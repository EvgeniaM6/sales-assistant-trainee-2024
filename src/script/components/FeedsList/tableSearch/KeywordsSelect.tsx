import { useContext, useMemo, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { ThemeContext } from '../../../../App';
import { useGetFeedsMutation } from '../../../redux/feedsApi';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { UpworkFeedSearchBy } from '../../../../public-common/enums/upwork-feed/upwork-feed-search-by.enum';
import { setSearchParam } from '../../../store/feedsSlice';
import { ISearchParameterDTO } from '../../../../public-common/interfaces/dto/common/isearch-parameter.interface';
import { SelectOptionFeeds } from '../../../models';

function KeywordsSelect() {
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);
  const { data: feedsData } = useGetFeedsMutation({ fixedCacheKey: 'feedsCacheKey' })[1];

  const feedsValues = useAppSelector((store) => store.feeds);
  const keywordsSearchParam = feedsValues.searchParameters?.find(
    ({ searchBy }) => searchBy === UpworkFeedSearchBy.Keywords
  );
  const [keywordsArrVal, setKeywordsVal] = useState<string[]>((keywordsSearchParam?.searchQuery as string[]) || ['all']);

  const allItemsOption = { value: 'all', label: 'All' };

  const { keywordsOptions } = useMemo(() => ({
    keywordsOptions: feedsData?.data.keywordsOptions ?? [],
  }), [feedsData]);

  const keywordsOptionsArr: SelectOptionFeeds[] = [allItemsOption, ...keywordsOptions];
  const defaultOption = keywordsOptionsArr.find(({ value }) => value === keywordsArrVal[0]);

  const filterByKeywords = (): void => {
    const isAllSelected = !keywordsSearchParam && keywordsArrVal[0] === 'all';
    const isSameSelected = (keywordsSearchParam?.searchQuery || [])[0] === keywordsArrVal[0];
    if (isAllSelected || isSameSelected) return;

    const newSearchParameter: Required<ISearchParameterDTO<UpworkFeedSearchBy>> = {
      searchBy: UpworkFeedSearchBy.Keywords,
      searchQuery: keywordsArrVal.filter((keyword) => keyword !== 'all'),
    };

    dispatch(setSearchParam(newSearchParameter));
  };

  const handleChange = (
    newVal: SingleValue<SelectOptionFeeds>
  ): void => {
    if (!newVal) {
      setKeywordsVal(['all']);
    } else {
      setKeywordsVal([newVal.value]);
    }
  };

  return (
    <Select
      options={keywordsOptionsArr}
      defaultValue={defaultOption}
      onBlur={filterByKeywords}
      onChange={handleChange}
      placeholder={''}
      isClearable={true}
      className={`react-select-container ${theme}`}
      classNamePrefix='react-select'
    />
  );
}

export default KeywordsSelect;
