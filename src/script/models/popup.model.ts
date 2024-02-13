import { ComponentPropsWithoutRef } from 'react';

export type PopupProps = ComponentPropsWithoutRef<'div'> & {
  close: () => void;
  confirm: () => void;
  confirmAction: string;
};

export type CreateChatForm = {
  chatName: string;
};
