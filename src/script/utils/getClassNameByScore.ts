export const getClassNameByScore = (score: number): string => {
  const isFrom0To50 = score >= 0 && score <= 19;
  const isFrom50To100 = score > 19 && score <= 39;
  const isFrom100To150 = score > 39 && score <= 59;
  const isFrom150To200 = score > 59 && score <= 79;
  const isFrom200To250 = score > 79 && score <= 100;

  let scoreClassName: string;
  if (isFrom0To50) {
    scoreClassName = 'red';
  } else if (isFrom50To100) {
    scoreClassName = 'orange';
  } else if (isFrom100To150) {
    scoreClassName = 'yellow';
  } else if (isFrom150To200) {
    scoreClassName = 'yellowgreen';
  } else if (isFrom200To250) {
    scoreClassName = 'green';
  } else {
    scoreClassName = 'blue';
  }

  return scoreClassName;
};
