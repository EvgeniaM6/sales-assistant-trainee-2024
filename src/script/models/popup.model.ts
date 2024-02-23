import { ComponentPropsWithoutRef } from 'react';

export type PopupProps = ComponentPropsWithoutRef<'div'> & {
  close: () => void;
  confirm: () => void;
  confirmAction: string;
};

export type PopupTooltipProps = ComponentPropsWithoutRef<'div'> & {
  close: () => void;
  refElem: React.MutableRefObject<HTMLButtonElement | null>;
};

export type CreateChatForm = {
  chatName: string;
};
