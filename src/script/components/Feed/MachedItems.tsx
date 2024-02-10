import { IUpworkFeedMatchEntityDto } from '../../../public-common/interfaces/dto/upwork-feed/iupwork-feed-match-entity.dto';
import ExpandingMarkdownText from './ExpandingMarkdownText';

function MachedItems({ matchedTitle, matchedData }: {
  matchedTitle: string,
  matchedData: IUpworkFeedMatchEntityDto[]
}) {
  return (
    <div className='feed__matched matched'>
      <h4 className='feed__note'>{`Matched ${matchedTitle}`}</h4>
      {matchedData.map((matchedCase) => {
        return (
          <div key={matchedCase.docId} className='matched__item'>
            <h5 className='matched__title'>
              <a href={matchedCase.link} className='matched__link'>{matchedCase.title || 'link'}</a>
            </h5>
            <ExpandingMarkdownText text={matchedCase.content} />
          </div>
        );
      })
      }
    </div>
  );
}

export default MachedItems;
