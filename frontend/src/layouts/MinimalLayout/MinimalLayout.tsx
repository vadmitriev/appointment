import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/components';
import styles from './MinimalLayout.module.scss';

interface MinimalLayoutProps {}

export const MinimalLayout: React.FC<MinimalLayoutProps> = () => {
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
