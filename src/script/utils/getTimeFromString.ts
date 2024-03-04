export const getTimeFromString = (timeStr: string): string => {
  const timeDate = new Date(timeStr);

  const date = timeDate.getDate();
  const month = timeDate.getMonth() + 1;
  const yearFull = timeDate.getFullYear();
  const hours = timeDate.getHours();
  const minutes = timeDate.getMinutes();

  const dateFull = getFullNumber(date);
  const monthFull = getFullNumber(month);
  const hoursFull = getFullNumber(hours);
  const minutesFull = getFullNumber(minutes);

  return `${dateFull}/${monthFull}/${yearFull} ${hoursFull}:${minutesFull}`;
};

const getFullNumber = (value: number): string => {
  return value > 9 ? `${value}` : `0${value}`;
};

export const getStringFromDate = (startTimeDate: Date, endTimeDate: Date | null): string => {
  const dates = {
    start: '',
    end: '',
  };

  const startDate = startTimeDate.getDate();
  const startMonth = startTimeDate.getMonth() + 1;
  const startYearFull = startTimeDate.getFullYear();

  const startDateFull = getFullNumber(startDate);
  const startMonthFull = getFullNumber(startMonth);

  const startDayStr = `${startYearFull}-${startMonthFull}-${startDateFull}`;
  dates.start = startDayStr;

  if (endTimeDate) {
    const endDate = endTimeDate.getDate();
    const endMonth = endTimeDate.getMonth() + 1;
    const endYearFull = endTimeDate.getFullYear();

    const endDateFull = getFullNumber(endDate);
    const endMonthFull = getFullNumber(endMonth);

    const endDayStr = `${endYearFull}-${endMonthFull}-${endDateFull}`;
    dates.end = endDayStr;
  }

  const start = `${dates.start}T00:00:00.000Z`;
  const finish = `${dates.end || dates.start}T00:00:00.000Z`;
  return `${start} - ${finish}`;
};
