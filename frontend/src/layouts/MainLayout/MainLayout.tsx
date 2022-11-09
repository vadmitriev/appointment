import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/components';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {}

export const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <main className={styles.body}>
        <Outlet />
      </main>
      <Footer className={styles.footer} />
    </div>
  );
};
