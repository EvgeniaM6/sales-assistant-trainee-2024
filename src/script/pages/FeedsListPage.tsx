import { useState } from 'react';
import { FeedsBlock, Header, SideBar } from '../components';

function FeedsListPage() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const toggleOpenSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className='page feeds-list-page'>
      <SideBar isOpen={isSideBarOpen} />
      <div className={`page__part${isSideBarOpen ? '-full' : ''} feeds-list-page__main feeds`}>
        <Header isSideBarOpen={isSideBarOpen} toggleOpenSideBar={toggleOpenSideBar} />
        <FeedsBlock />
      </div>
    </div>
  );
}

export default FeedsListPage;
