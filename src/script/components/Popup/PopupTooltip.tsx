import { usePopper } from 'react-popper';
import { PopupTooltipProps } from '../../models';
import { useState } from 'react';

function PopupTooltip({ children, close, refElem }: PopupTooltipProps) {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(refElem, popperElement, {
    placement: 'bottom-end',
  });

  return (
    <>
      <div className='overlay overlay-tooltip' onClick={close} />
      <div
        ref={setPopperElement}
        style={{ ...styles.popper}}
        className='popup popup-tooltip'
        {...attributes.popper}
      >
        {children}
      </div>
    </>
  );
}

export default PopupTooltip;
