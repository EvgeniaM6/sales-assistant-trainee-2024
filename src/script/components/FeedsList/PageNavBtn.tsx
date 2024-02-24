import { useContext } from 'react';
import { ThemeContext } from '../../../App';
import { useAppDispatch } from '../../hooks';
import { setPageNumber } from '../../store/feedsSlice';

function PageNavBtn({ pageNumber, totalPages, role }: { pageNumber: number, totalPages: number, role: string }) {
  const { theme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const isFirstBtn = role === 'first';
  const isPreviousBtn = role === 'previous';
  const isNextBtn = role === 'next';
  const isLastBtn = role === 'last';

  const isPrevBtnsDisabled = (isFirstBtn || isPreviousBtn) && pageNumber === 1;
  const isNextBtnsDisabled = (isNextBtn || isLastBtn) && pageNumber === totalPages;

  let pageOnClick = 1;

  if (isPreviousBtn) {
    pageOnClick = pageNumber - 1;
  } else if (isNextBtn) {
    pageOnClick = pageNumber + 1;
  } else if (isLastBtn) {
    pageOnClick = totalPages;
  }

  const handleClickPage = () => {
    dispatch(setPageNumber(pageOnClick));
  };

  return (
    <div className='feeds-pagination__page pagination'>
      <button
        className={`pagination__item pagination__btn ${theme}`}
        disabled={isPrevBtnsDisabled || isNextBtnsDisabled}
        onClick={handleClickPage}
      >
        <span className={`pagination__btn-icon ${role} ${theme}`}></span>
      </button>
    </div>
  );
}

export default PageNavBtn;
