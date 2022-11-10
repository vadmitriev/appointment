import React from 'react';
import { publicRoutes } from '@/routes/PublicRoutes';
import styles from './NavBar.module.scss';
import { Link } from 'react-router-dom';
import { IRoute } from '../../interfaces/route.interface';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  return (
    <div className={styles.navbar}>
      {publicRoutes.map((route: IRoute) => (
        <Link key={route.path} to={route.path} className={styles.link}>
          {route.name}
        </Link>
      ))}
    </div>
  );
};
