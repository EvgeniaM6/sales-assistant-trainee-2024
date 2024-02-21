import { ComponentPropsWithoutRef } from 'react';

export type PopupProps = ComponentPropsWithoutRef<'div'> & {
  close: () => void;
  confirm: () => void;
  confirmAction: string;
};

export type PopupTooltipProps = ComponentPropsWithoutRef<'div'> & {
  close: () => void;
  refElem: HTMLButtonElement | null;
  isOnTop?: boolean;
};

export type CreateChatForm = {
  chatName: string;
};
