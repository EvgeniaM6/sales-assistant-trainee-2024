import { usePopper } from 'react-popper';
import { PopupTooltipProps } from '../../models';
import { useContext, useRef } from 'react';
import { ThemeContext } from '../../../App';

function PopupTooltip({ children, close, refElem }: PopupTooltipProps) {
  const popperElement = useRef<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(popperElement.current, refElem.current, {
    placement: 'bottom-end',
  });
  const { theme } = useContext(ThemeContext);

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
        {children}
      </div>
    </>
  );
}

export default PopupTooltip;
