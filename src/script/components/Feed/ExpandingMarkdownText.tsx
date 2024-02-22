import { useContext, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ThemeContext } from '../../../App';

function ExpandingMarkdownText({ text }: { text: string }) {
  const { theme } = useContext(ThemeContext);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = (toOpen: boolean) => {
    setIsDescriptionExpanded(toOpen);
  };

  return (
    <div className='markdown'>
      <div className='markdown__text'>
        <ReactMarkdown>
          {isDescriptionExpanded ? text : `${text.slice(0, 300)}...`}
        </ReactMarkdown>
      </div>
      <div className='markdown__expand'>
        <button className={`markdown__expand-btn ${theme}`} onClick={() => toggleDescription(!isDescriptionExpanded)}>
          {isDescriptionExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
    </div>
  );
}

export default ExpandingMarkdownText;
