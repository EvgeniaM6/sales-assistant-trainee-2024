import logoImg from '../../../assets/images/abcloudz.svg';

function Logo() {
  return (
    <div className='logo'>
      <div className='logo__image'>
        <img src={logoImg} alt="abcloudz logo" className='logo__image-img'/>
      </div>
      <div className='logo__title'>
        <h1 className='logo__title-text'>Sales Assistant</h1>
      </div>
    </div>
  );
}

export default Logo;
