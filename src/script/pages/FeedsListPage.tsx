import { useContext, useState } from 'react';
import { FeedsBlock, Header, SideBar } from '../components';
import { ThemeContext } from '../../App';

function FeedsListPage() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { theme } = useContext(ThemeContext);

  const toggleOpenSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className='page feeds-list-page'>
      <SideBar isOpen={isSideBarOpen} />
      <div
        className={
          `page__part${isSideBarOpen ? '-full' : ''} feeds-list-page__main ${theme} feeds`
        }
      >
        <Header isSideBarOpen={isSideBarOpen} toggleOpenSideBar={toggleOpenSideBar} />
        <FeedsBlock />
      </div>
    </div>
  );
}

export default FeedsListPage;
