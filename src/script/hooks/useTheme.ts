import { useEffect, useState } from 'react';
import { ThemeContextComponents } from '../models';
import { getLocalStorageTheme } from '../utils';

function useTheme(): ThemeContextComponents {
  const localStorageTheme: string = getLocalStorageTheme();
  const [theme, setTheme] = useState(localStorageTheme);

  const handleStorageEvent = (e: StorageEvent) => {
    const { key, newValue } = e;

    if (key !== 'theme') return;
    setTheme(newValue ? newValue : '');
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  return { theme, setTheme };
}

export default useTheme;
