function Header() {
  return (
    <header className='header'>
      <div className='header__item'>
        <button className='header__btn'>
          <span className='header__btn-img collapse'></span>
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
