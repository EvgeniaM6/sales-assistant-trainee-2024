import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { PageRoutes } from '../../constants';
import ExpandingMarkdownText from './ExpandingMarkdownText';
import MachedItems from './MachedItems';
import { IUpworkFeedMatchEntityDto } from '../../../public-common/interfaces/dto/upwork-feed/iupwork-feed-match-entity.dto';
import { IUpworkFeedDetailItemDTO } from '../../../public-common/interfaces/dto/upwork-feed/iupwork-feed-detail-item.dto';
import { getClassNameByScore, getTimeFromString } from '../../utils';
import { ThemeContext } from '../../../App';

function Feed({ data }: { data: IUpworkFeedDetailItemDTO }) {
  const { theme } = useContext(ThemeContext);
  const { title, description, score, url, published, keywords, matchedCasesData, matchedBlogsData } = data;
  const scoreClassName = getClassNameByScore(score);

  return (
    <main className='feed'>
      <div className='feed__main'>
        <p className='feed__crumbs'>
          <NavLink className={`feed__crumbs-link ${theme}`} to={`/${PageRoutes.Feed}`}>Upwork feed</NavLink>
          <span className='feed__crumbs-arrow'>{' >'}</span>
        </p>
        <h2 className='feed__title'>{title}</h2>
      </div>
      <div className='feed__block'>
        <div className='feed__content'>
          <div className='feed__item feed-info'>
            <h4 className='feed__note'>Project info</h4>
            <div className='feed-info__details'>
              <div className='feed-info__details-item score'>
                <span className={`score__content score-${scoreClassName} ${theme}`}>
                  {score}
                </span>
              </div>
              <div className='feed-info__details-item'>
                <a href={url} target='_blank' rel='noreferrer' className='feed__link'>{title}</a>
              </div>
              <div className='feed-info__details-item published'>
                <span className='published__content'>{getTimeFromString(published)}</span>
              </div>
            </div>
            <ExpandingMarkdownText text={description} />
          </div>
          <div className='feed__item feed__keywords'>
            <h4 className='feed__note'>Keywords</h4>
            <div className='feed__keywords-container'>
              {keywords.map((keyword) => (
                <span key={keyword} className={`feed__keyword ${theme}`}>{keyword}</span>
              ))}
            </div>
          </div>
          <MachedItems matchedTitle='cases' matchedData={matchedCasesData as IUpworkFeedMatchEntityDto[]} />
          <MachedItems matchedTitle='blogs' matchedData={matchedBlogsData} />
        </div>
      </div>
    </main>
  );
}

export default Feed;
