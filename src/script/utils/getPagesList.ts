export const getPagesList = (
  pageNumber: number,
  totalPages: number
): Array<number | string> => {
  const pagesArr: Array<number | string> = [];

  if (totalPages < 7) {
    for (let i = 1; i <= totalPages; i++) {
      pagesArr.push(i);
    }

    return pagesArr;
  }

  if (pageNumber > 3) {
    pagesArr.push(1);
    pagesArr.push('ellipsis');
  }

  if (pageNumber >= 1 && pageNumber <= 3) {
    for (let i = 1; i < 6; i++) {
      pagesArr.push(i);
    }
  }

  if (pageNumber > 3 && pageNumber <= totalPages - 3) {
    for (let i = -1; i < 2; i++) {
      pagesArr.push(pageNumber + i);
    }
  }

  if (pageNumber > totalPages - 3 && pageNumber <= totalPages) {
    for (let i = -4; i < 1; i++) {
      pagesArr.push(totalPages + i);
    }
  }

  if (pageNumber <= totalPages - 3) {
    pagesArr.push('ellipsis-last');
    pagesArr.push(totalPages);
  }

  return pagesArr;
};
