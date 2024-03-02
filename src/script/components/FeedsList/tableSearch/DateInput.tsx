import { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ThemeContext } from '../../../../App';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { UpworkFeedSearchBy } from '../../../../public-common/enums/upwork-feed/upwork-feed-search-by.enum';
import { ISearchParameterDTO } from '../../../../public-common/interfaces/dto/common/isearch-parameter.interface';
import { setSearchParam } from '../../../store/feedsSlice';
import { getStringFromDate } from '../../../utils';
import { ColumnData } from '../../../models';

function DateInput({ column }: ColumnData) {
  const columnId = column.id as UpworkFeedSearchBy;

  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);

  const { searchParameters } = useAppSelector((store) => store.feeds);
  const dateSearchParam = searchParameters?.find(
    ({ searchBy }) => searchBy === columnId
  );

  let startDateFromState: Date | null = null;
  let endDateFromState: Date | null = null;

  if (dateSearchParam && dateSearchParam.searchQuery) {
    const [from, to] = (dateSearchParam.searchQuery as string).split(' - ');
    startDateFromState = new Date(from);
    endDateFromState = new Date(to);
  }

  const [startDate, setStartDate] = useState<Date | null>(startDateFromState);
  const [endDate, setEndDate] = useState<Date | null>(endDateFromState);

  const filterByDate = (): void => {
    if (!dateSearchParam && !startDate || startDate && !endDate) return;

    const newSearchParameter: Required<ISearchParameterDTO<UpworkFeedSearchBy>> = {
      searchBy: columnId,
      searchQuery: !!startDate ? getStringFromDate(startDate, endDate) : '',
    };

    dispatch(setSearchParam(newSearchParameter));
  };

  useEffect(() => {
    console.log('endDate=', endDate);
    const timeout = setTimeout(() => filterByDate(), 500);
    return () => clearTimeout(timeout);
  }, [endDate]);

  const handleChangeDate = (dates: Array<Date | null>) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <DatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={handleChangeDate}
      isClearable={true}
      dateFormat='dd/MM/yyyy'
      maxDate={new Date()}
      calendarStartDay={1}
      showPopperArrow={false}
      formatWeekDay={(nameOfDay: string) => nameOfDay.slice(0, 3).toUpperCase()}
      className={`head-cell__input ${theme}`}
      id={columnId}
      autoComplete='off'
    />
  );
}

export default DateInput;
