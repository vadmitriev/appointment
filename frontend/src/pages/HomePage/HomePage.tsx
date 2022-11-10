import React, { useEffect } from 'react';
import { Button } from '@/components';
import styles from './HomePage.module.scss';

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Random picture:</div>
      <div className={styles.imgBox}>
        <img
          src="https://picsum.photos/200"
          alt="Random picture"
          className={styles.img}
        />
      </div>
    </div>
  );
};

export default HomePage;
