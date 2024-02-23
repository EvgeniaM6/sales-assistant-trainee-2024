export const getClassNameByScore = (score: number): string => {
  const isFrom0To50 = score > 0 && score <= 50;
  const isFrom50To100 = score > 50 && score <= 100;
  const isFrom100To150 = score > 100 && score <= 150;
  const isFrom150To200 = score > 150 && score <= 200;
  const isFrom200To250 = score > 200 && score <= 250;

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
