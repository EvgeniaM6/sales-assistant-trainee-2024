import { NavLink } from 'react-router-dom';
import { PageRoutes } from '../../constants';
import fetchFeed from './fetchFeed.json';
import ExpandingMarkdownText from './ExpandingMarkdownText';
import MachedItems from './MachedItems';
import { IUpworkFeedMatchEntityDto } from '../../../public-common/interfaces/dto/upwork-feed/iupwork-feed-match-entity.dto';

function Feed({ id }: { id: string }) {
  console.log(id);
  const { title, description, score, url, published, keywords, matchedCasesData, matchedBlogsData } = fetchFeed.data;

  return (
    <main className='feed'>
      <p className='feed__crumbs'>
        <NavLink className='feed__crumbs-link' to={`/${PageRoutes.Feed}`}>Upwork feed</NavLink>
        <span className='feed__crumbs-arrow'>{'>'}</span>
      </p>
      <h2 className='feed__title'>{title}</h2>
      <div className='feed__info'>
        <p className='feed__note'>Project info</p>
        <div className='feed__details'>
          <div className='feed__details-item'>
            <span
              className='feed__score'
              style={{backgroundColor: `hsl(${score > 250 ? 180 : score * 180 / 250}deg 100% 80%)`}}
            >
              {score}
            </span>
          </div>
          <div className='feed__details-item'>
            <a href={url} className='feed__link'>{title}</a>
          </div>
          <div className='feed__details-item'>
            <span className='feed__published'>{published}</span>
          </div>
        </div>
        <ExpandingMarkdownText text={description} />
      </div>
      <div className='feed__keywords'>
        <h4 className='feed__note'>Keywords</h4>
        <div className='feed__keywords-container'>
          {keywords.map((keyword) => (
            <span key={keyword} className='feed__keyword'>{keyword}</span>
          ))}
        </div>
      </div>
      <MachedItems matchedTitle='cases' matchedData={matchedCasesData as IUpworkFeedMatchEntityDto[]} />
      <MachedItems matchedTitle='blogs' matchedData={matchedBlogsData} />
    </main>
  );
}

export default Feed;
