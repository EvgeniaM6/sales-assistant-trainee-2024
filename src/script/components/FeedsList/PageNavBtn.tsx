import { useContext } from 'react';
import { ThemeContext } from '../../../App';

function PageNavBtn({ pageNumber, totalPages, role }: { pageNumber: number, totalPages: number, role: string }) {
  const { theme } = useContext(ThemeContext);

  const isFirstBtn = role === 'first' && pageNumber === 1;
  const isPreviousBtn = role === 'previous' && pageNumber === 1;
  const isNextBtn = role === 'next' && pageNumber === totalPages;
  const isLastBtn = role === 'last' && pageNumber === totalPages;

  return (
    <div className='feeds-pagination__page pagination'>
      <button
        className={`pagination__item pagination__btn ${theme}`}
        disabled={isFirstBtn || isPreviousBtn || isNextBtn || isLastBtn}
      >
        <span className={`pagination__btn-icon ${role} ${theme}`}></span>
      </button>
    </div>
  );
}

export default PageNavBtn;
