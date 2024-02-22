import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ThemeContext } from '../../../App';

function DateInput() {
  const { theme } = useContext(ThemeContext);
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
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
