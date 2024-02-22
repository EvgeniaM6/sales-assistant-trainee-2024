import { useContext } from 'react';
import { ThemeContext } from '../../../App';

function Spin({ isInset }: { isInset?: boolean }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`spin-container ${isInset ? 'spin-container-inset' : ''} ${theme}`}>
      <div className='spin'></div>
    </div>
  );
}

export default Spin;
