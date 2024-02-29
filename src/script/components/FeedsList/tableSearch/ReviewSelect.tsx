import { useContext, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { ThemeContext } from '../../../../App';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { UpworkFeedSearchBy } from '../../../../public-common/enums/upwork-feed/upwork-feed-search-by.enum';
import { setSearchParam } from '../../../store/feedsSlice';
import { ISearchParameterDTO } from '../../../../public-common/interfaces/dto/common/isearch-parameter.interface';
import { SelectOptionFeeds } from '../../../models';

function ReviewSelect() {
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);

  const feedsValues = useAppSelector((store) => store.feeds);
  const reviewsSearchParam = feedsValues.searchParameters?.find(
    ({ searchBy }) => searchBy === UpworkFeedSearchBy.Review
  );
  const [reviewsArrVal, setReviewsVal] = useState<string[]>((reviewsSearchParam?.searchQuery as string[]) || ['all']);

  const allItemsOption = { value: 'all', label: 'All' };

  const reviewOptions = [
    { value: 'Like', label: 'Like' },
    { value: 'Dislike', label: 'Dislike' },
  ];

  const reviewOptionsArr: SelectOptionFeeds[] = [allItemsOption, ...reviewOptions];
  const defaultOption = reviewOptionsArr.find(({ value }) => value === reviewsArrVal[0]);

  const filterByReviews = (): void => {
    const isAllSelected = !reviewsSearchParam && reviewsArrVal[0] === 'all';
    const isSameSelected = (reviewsSearchParam?.searchQuery || [])[0] === reviewsArrVal[0];
    if (isAllSelected || isSameSelected) return;

    const newSearchParameter: Required<ISearchParameterDTO<UpworkFeedSearchBy>> = {
      searchBy: UpworkFeedSearchBy.Review,
      searchQuery: reviewsArrVal.filter((review) => review !== 'all'),
    };

    dispatch(setSearchParam(newSearchParameter));
  };

  const handleChange = (
    newVal: SingleValue<SelectOptionFeeds>
  ): void => {
    if (!newVal) {
      setReviewsVal(['all']);
    } else {
      setReviewsVal([newVal.value]);
    }
  };

  return (
    <Select
      options={reviewOptionsArr}
      defaultValue={defaultOption}
      onBlur={filterByReviews}
      onChange={handleChange}
      placeholder={''}
      isClearable={true}
      className={`react-select-container ${theme}`}
      classNamePrefix='react-select'
    />
  );
}

export default ReviewSelect;
