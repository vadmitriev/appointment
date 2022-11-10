import { THEME_KEY, THEME_QUERY } from '@/constants';
import { getPrefersTheme } from '@/helpers';
import { useCallback, useState } from 'react';

export enum COLOR_THEME {
  light = 'light',
  dark = 'dark',
}

const prefersTheme = getPrefersTheme();

const defaultArg = { saveInLocalStorage: true };

export const useTheme = ({ saveInLocalStorage } = defaultArg) => {
  const lcTheme = saveInLocalStorage
    ? localStorage.getItem(THEME_KEY)
    : prefersTheme;

  const initTheme = lcTheme ?? COLOR_THEME.dark;
  const [theme, setTheme] = useState(initTheme);
  document.documentElement.setAttribute(THEME_KEY, theme);

  const changeTheme = useCallback(
    (theme = '') => {
      const currentTheme = theme === '' ? COLOR_THEME.light : theme;
      setTheme(currentTheme);

      if (saveInLocalStorage) {
        localStorage.setItem(THEME_KEY, currentTheme);
      }

      document.documentElement.setAttribute(THEME_KEY, currentTheme);
    },
    [saveInLocalStorage],
  );

  window.matchMedia(THEME_QUERY).addListener((e) => {
    const newTheme = e.matches ? COLOR_THEME.dark : COLOR_THEME.light;
    if (newTheme !== theme) {
      changeTheme(newTheme);
    }
  });

  const toggleTheme = useCallback(() => {
    theme === COLOR_THEME.light
      ? changeTheme(COLOR_THEME.dark)
      : changeTheme(COLOR_THEME.light);
  }, [theme, changeTheme]);

  return { theme, changeTheme, toggleTheme };
};
