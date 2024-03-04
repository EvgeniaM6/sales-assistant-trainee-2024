import { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ThemeContext } from '../../../../App';
import { getStringFromDate } from '../../../utils';
import { ColumnData } from '../../../models';

function DateInput({ column }: ColumnData) {
  const { theme } = useContext(ThemeContext);

  const columnFilterValue = column.getFilterValue() as string | undefined;

  let startDateFromState: Date | null = null;
  let endDateFromState: Date | null = null;

  if (columnFilterValue) {
    const [from, to] = (columnFilterValue as string).split(' - ');
    startDateFromState = new Date(from);
    endDateFromState = new Date(to);
  }

  const [startDate, setStartDate] = useState<Date | null>(startDateFromState);
  const [endDate, setEndDate] = useState<Date | null>(endDateFromState);

  const filterByDate = (): void => {
    if (!columnFilterValue && !startDate || startDate && !endDate) return;

    column.setFilterValue(!!startDate ? getStringFromDate(startDate, endDate) : undefined);
  };

  useEffect(() => {
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
      id={column.id}
      autoComplete='off'
    />
  );
}

export default DateInput;
