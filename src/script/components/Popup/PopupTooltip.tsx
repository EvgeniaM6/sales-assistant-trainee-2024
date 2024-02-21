import { usePopper } from 'react-popper';
import { PopupTooltipProps } from '../../models';
import { useRef } from 'react';

function PopupTooltip({ children, close, refElem, isOnTop }: PopupTooltipProps) {
  const popperElement = useRef<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(popperElement.current, refElem, {
    placement: 'bottom-end',
  });

  return (
    <>
      <div className='overlay overlay-tooltip' onClick={close} />
      <div
        ref={popperElement}
        style={{
          ...styles.popper,
          top: `${isOnTop ? 'auto': '100%'}`,
          bottom: `${isOnTop ? '100%': 'auto'}`,
        }}
        className='popup popup-tooltip'
        {...attributes.popper}
      >
        {children}
      </div>
    </>
  );
}

export default PopupTooltip;
