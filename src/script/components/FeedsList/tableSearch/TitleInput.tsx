import { useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { ThemeContext } from '../../../../App';
import { UpworkFeedSearchBy } from '../../../../public-common/enums/upwork-feed/upwork-feed-search-by.enum';
import { ISearchParameterDTO } from '../../../../public-common/interfaces/dto/common/isearch-parameter.interface';
import { setSearchParam } from '../../../store/feedsSlice';

function TitleInput() {
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);

  const feedsValues = useAppSelector((store) => store.feeds);
  const titleSearchParam = feedsValues.searchParameters?.find(({ searchBy }) => searchBy === UpworkFeedSearchBy.Title);
  const [titleVal, setTitleVal] = useState(titleSearchParam?.searchQuery || '');

  const filterByTitle = () => {
    if (titleSearchParam?.searchQuery === titleVal || (!titleSearchParam && !titleVal)) return;

    const newSearchParameter: Required<ISearchParameterDTO<UpworkFeedSearchBy>> = {
      searchBy: UpworkFeedSearchBy.Title,
      searchQuery: titleVal,
    };

    dispatch(setSearchParam(newSearchParameter));
  };

  const handleChangeTitleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitleVal(e.target.value);
  };

  const clearValue = () => {
    setTitleVal('');
    dispatch(setSearchParam({ searchBy: UpworkFeedSearchBy.Title, searchQuery: '' }));
  };

  return (
    <div className='head-cell__input-container'>
      <input
        type='text'
        className={`head-cell__input ${theme}`}
        id='title'
        value={titleVal}
        onChange={handleChangeTitleInput}
        onBlur={filterByTitle}
      />
      {titleVal && <button type='button' className='title-clear' onClick={clearValue} />}
    </div>
  );
}

export default TitleInput;
