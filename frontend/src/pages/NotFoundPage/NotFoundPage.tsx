import { Button } from '@/components';
import { PUBLIC_ROUTES } from '@/routes/constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  text?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  text = 'Страница не найдена',
}) => {
  const navigator = useNavigate();

  const handleClick = () => {
    navigator(PUBLIC_ROUTES.HOME);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.text}>{text}</div>
          <Button onClick={handleClick}>На главную</Button>
        </div>
      </div>
    </div>
  );
};
