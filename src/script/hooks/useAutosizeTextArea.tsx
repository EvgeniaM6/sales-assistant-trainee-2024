import { useEffect } from 'react';

const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = '0px';
      const scrollHeight = textAreaRef.scrollHeight;

      textAreaRef.style.height = Math.min(scrollHeight + 2, 752) + 'px';
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
