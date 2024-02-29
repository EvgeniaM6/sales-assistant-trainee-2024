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

export const getStringFromDate = (timeDate: Date): string => {
  const date = timeDate.getDate();
  const month = timeDate.getMonth() + 1;
  const yearFull = timeDate.getFullYear();

  const dateFull = getFullNumber(date);
  const monthFull = getFullNumber(month);

  const dayStr = `${yearFull}-${monthFull}-${dateFull}`;
  const start = `${dayStr}T00:00:00.000Z`;
  const finish = `${dayStr}T23:59:59.999Z`;
  return `${start} - ${finish}`;
};
