import { ColorTheme, THEME_KEY } from '@/constants';
import { saveToLocalStorage } from './localStorage';

export const getPrefersTheme = (): ColorTheme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const saveThemeToLS = (theme: ColorTheme) => {
  saveToLocalStorage(THEME_KEY, theme);
};
