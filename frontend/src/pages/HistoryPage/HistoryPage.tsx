import { useAppDispatch, useAppSelector } from '@/hooks';
import React, { useEffect } from 'react';
import styles from './HistoryPage.module.scss';

import { historyActions } from '@/store/history/historySlice';
import { HistoryTable, Loader, ScrollToTop } from '@/components';

interface HistoryPageProps {}

export const HistoryPage: React.FC<HistoryPageProps> = () => {
  const { error, isLoading, events } = useAppSelector((state) => state.history);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(historyActions.loadEvents());
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>{isLoading && <Loader />}</div>

      <div className={styles.content}>
        {events.length === 0 && !error && "It looks like there's nothing here"}
        {error ? <div>{error}</div> : <HistoryTable />}
        <ScrollToTop />
      </div>
    </div>
  );
};

export default HistoryPage;
