import { useTheme } from '@/hooks';
import { PUBLIC_ROUTES } from '@/routes/constants';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

import sunIcon from '@/assets/icons/sun.svg';
import moonIcon from '@/assets/icons/moon.svg';
import mainIcon from '@/assets/icons/vite.svg';
import { NavBar } from '@/components';

type HeaderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
  const navigator = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    navigator(PUBLIC_ROUTES.HOME);
  };

  const handleTheme = () => {
    toggleTheme();
  };

  return (
    <div className={`${className} ${styles.header}`} {...props}>
      <div className={styles.left} onClick={handleClick}>
        <img src={mainIcon} alt="main icon" />
      </div>
      <div className={styles.right}>
        <NavBar />
        <div className={styles.theme} onClick={handleTheme}>
          <img
            className={styles.icon}
            src={theme === 'light' ? sunIcon : moonIcon}
            alt="Theme icon"
          />
        </div>
      </div>
    </div>
  );
};
