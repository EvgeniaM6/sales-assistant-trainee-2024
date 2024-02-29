import { useContext, useMemo, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { ThemeContext } from '../../../../App';
import { useGetFeedsMutation } from '../../../redux/feedsApi';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { UpworkFeedSearchBy } from '../../../../public-common/enums/upwork-feed/upwork-feed-search-by.enum';
import { setSearchParam } from '../../../store/feedsSlice';
import { ISearchParameterDTO } from '../../../../public-common/interfaces/dto/common/isearch-parameter.interface';
import { SelectOptionFeeds } from '../../../models';

function ScoreSelect() {
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);
  const { data: feedsData } = useGetFeedsMutation({ fixedCacheKey: 'feedsCacheKey' })[1];

  const feedsValues = useAppSelector((store) => store.feeds);
  const scoresSearchParam = feedsValues.searchParameters?.find(
    ({ searchBy }) => searchBy === UpworkFeedSearchBy.Score
  );
  const [scoresArrVal, setScoresVal] = useState<string[]>((scoresSearchParam?.searchQuery as string[]) || ['all']);

  const allItemsOption = { value: 'all', label: 'All' };

  const { scoreOptions } = useMemo(() => ({
    scoreOptions: feedsData?.data.scoreOptions ?? [],
  }), [feedsData]);

  const scoreOptionsArr: SelectOptionFeeds[] = [allItemsOption, ...scoreOptions];
  const defaultOption = scoreOptionsArr.find(({ value }) => value === scoresArrVal[0]);

  const filterByScores = (): void => {
    const isAllSelected = !scoresSearchParam && scoresArrVal[0] === 'all';
    const isSameSelected = (scoresSearchParam?.searchQuery || [])[0] === scoresArrVal[0];
    if (isAllSelected || isSameSelected) return;

    const newSearchParameter: Required<ISearchParameterDTO<UpworkFeedSearchBy>> = {
      searchBy: UpworkFeedSearchBy.Score,
      searchQuery: scoresArrVal.filter((score) => score !== 'all'),
    };

    dispatch(setSearchParam(newSearchParameter));
  };

  const handleChange = (
    newVal: SingleValue<SelectOptionFeeds>
  ): void => {
    if (!newVal) {
      setScoresVal(['all']);
    } else {
      setScoresVal([newVal.value]);
    }
  };

  return (
    <Select
      options={scoreOptionsArr}
      defaultValue={defaultOption}
      onBlur={filterByScores}
      onChange={handleChange}
      placeholder={''}
      isClearable={true}
      className={`react-select-container ${theme}`}
      classNamePrefix='react-select'
    />
  );
}

export default ScoreSelect;
