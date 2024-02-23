import { usePopper } from 'react-popper';
import { PopupTooltipProps } from '../../models';
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { ThemeContext } from '../../../App';

function PopupTooltip({ children, close, refElem }: PopupTooltipProps) {
  const popperElement = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { styles, attributes } = usePopper(
    refElem.current,
    popperElement.current,
    {
      placement: 'bottom-end',
      strategy: 'fixed',
    }
  );

  const { theme } = useContext(ThemeContext);

  useLayoutEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <div className='overlay overlay-tooltip' onClick={close} />
      <div
        ref={popperElement}
        style={{
          ...styles.popper,
        }}
        className={`popup popup-tooltip ${theme}`}
        {...attributes.popper}
      >
        {isVisible && children}
      </div>
    </>
  );
}

export default PopupTooltip;
