import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ThemeContext } from '../../../../App';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { UpworkFeedSearchBy } from '../../../../public-common/enums/upwork-feed/upwork-feed-search-by.enum';
import { ISearchParameterDTO } from '../../../../public-common/interfaces/dto/common/isearch-parameter.interface';
import { setSearchParam } from '../../../store/feedsSlice';
import { getStringFromDate } from '../../../utils';

function DateInput() {
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);

  const feedsValues = useAppSelector((store) => store.feeds);
  const titleSearchParam = feedsValues.searchParameters?.find(
    ({ searchBy }) => searchBy === UpworkFeedSearchBy.Published
  );

  let dateFromState: Date | null = null;
  if (titleSearchParam && titleSearchParam.searchQuery) {
    dateFromState = new Date(titleSearchParam.searchQuery as string);
  }

  const [startDate, setStartDate] = useState<Date | null>(dateFromState);

  const filterByDate = (): void => {
    if (dateFromState === startDate || (!titleSearchParam && !startDate)) return;

    const newSearchParameter: Required<ISearchParameterDTO<UpworkFeedSearchBy>> = {
      searchBy: UpworkFeedSearchBy.Published,
      searchQuery: startDate ? getStringFromDate(startDate) : '',
    };

    dispatch(setSearchParam(newSearchParameter));
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      onBlur={filterByDate}
      isClearable
      dateFormat='dd/MM/yyyy'
      maxDate={new Date()}
      calendarStartDay={1}
      showPopperArrow={false}
      formatWeekDay={(nameOfDay: string) => nameOfDay.slice(0, 3).toUpperCase()}
      className={`head-cell__input ${theme}`}
      id='published'
      autoComplete='off'
    />
  );
}

export default DateInput;
