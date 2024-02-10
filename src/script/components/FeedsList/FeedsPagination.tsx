import fetchFeeds from './fetchFeeds.json';

function FeedsPagination() {
  const { pageNumber, pageSize, totalCount, totalPages } = fetchFeeds.data.items;
  const countOnPage = pageNumber * pageSize;

  const pagesArr = [pageNumber, pageNumber + 1, pageNumber + 2, pageNumber + 3, pageNumber + 4];
  const handleClickPage = (page: string) => {
    console.log(page);
  };

  return (
    <div className="feeds__pagination feeds-pagination">
      <div className="feeds-pagination__info info">
        <span>Items shown:</span>
        <span className='info__bold'>{` ${countOnPage - pageSize + 1}-${countOnPage} `}</span>
        <span>out of</span>
        <span className='info__bold'>{` ${totalCount}`}</span>
      </div>
      <div className="feeds-pagination__divider"></div>
      <div className='feeds-pagination__page-size'>
        <span>Items per page</span>
        <select name="" id="">
          <option value="">{pageSize}</option>
        </select>
      </div>
      <div className='feeds-pagination__pages'>
        <div className='feeds-pagination__page pagination'>
          <button className='pagination__item pagination__btn' disabled>
            <span className='pagination__btn-icon first'></span>
          </button>
        </div>
        <div className='feeds-pagination__page pagination'>
          <button className='pagination__item pagination__btn' disabled>
            <span className='pagination__btn-icon previous'></span>
          </button>
        </div>
        {pagesArr.map((page) => (
          <div className='feeds-pagination__page pagination' key={page}>
            <button
              className={`pagination__item pagination__btn ${page === pageNumber ? 'btn-secondary' : ''}`}
              onClick={() => handleClickPage(`${page}`)}
            >
              {page}
            </button>
          </div>
        ))}
        <div className='feeds-pagination__page pagination'>
          <span className='pagination__item'>{'...'}</span>
        </div>
        <div className='feeds-pagination__page pagination'>
          <button className='pagination__item pagination__btn'>{totalPages}</button>
        </div>
        <div className='feeds-pagination__page pagination'>
          <button className='pagination__item pagination__btn'>
            <span className='pagination__btn-icon next'></span>
          </button>
        </div>
        <div className='feeds-pagination__page pagination'>
          <button className='pagination__item pagination__btn'>
            <span className='pagination__btn-icon last'></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedsPagination;
