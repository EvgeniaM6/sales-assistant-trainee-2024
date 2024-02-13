function Header({ isSideBarOpen, toggleOpenSideBar }: {
  isSideBarOpen: boolean;
  toggleOpenSideBar: () => void;
}) {
  return (
    <header className='header'>
      <div className='header__item'>
        <button className='header__btn' onClick={toggleOpenSideBar}>
          <span className={`header__btn-img ${isSideBarOpen ? 'collapse' : 'open'}`}></span>
        </button>
      </div>
      <div className='header__item'>
        <button className='header__btn'>
          <span className='header__btn-img theme'></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
