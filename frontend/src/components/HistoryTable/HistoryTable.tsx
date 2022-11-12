import React, { useEffect, useRef, useState } from 'react';
import { formTableData, getItemsSlice } from '@/helpers';
import styles from './HistoryTable.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { historyActions } from '@/store/history/historySlice';
import { throttle } from 'lodash';
import TableRow from './TableRow/TableRow';
import { IEventTableItem } from '@/interfaces';

interface HistoryTableProps {}

export const HistoryTable: React.FC<HistoryTableProps> = () => {
  const dispatch = useAppDispatch();
  const { page, itemsPerPage, events, resources, isLoading } = useAppSelector(
    (state) => state.history,
  );

  const [visibleItems, setVisibleItems] = useState<IEventTableItem[]>([]);

  const loaderRef = useRef<HTMLDivElement>(null);

  const handleObserver = throttle((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && !isLoading) {
      dispatch(historyActions.setPage(page + 1));
    }
  }, 1000);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    if (events.length <= page * itemsPerPage) {
      observer.disconnect();
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    dispatch(historyActions.loadResources());
  }, [page]);

  useEffect(() => {
    if (resources.length > 0) {
      const eventsSlice = getItemsSlice(events, page, itemsPerPage);
      const newItems = formTableData(eventsSlice, resources);
      setVisibleItems(visibleItems.concat(newItems));
    }
  }, [resources.length]);

  if (!events.length) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.row}>
            <th>Event type</th>
            <th>Details</th>
            <th>Code</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {visibleItems.map((item, i) => {
            const prevItem = visibleItems[i - 1];
            const isSameGroup =
              item.appointmentId && item.resource === prevItem?.resource;
            return (
              <TableRow
                key={`${item.resource}/${item.id}/${new Date()}`}
                rowClassName={styles.row}
                item={item}
                isFirstItem={!isSameGroup}
              />
            );
          })}
        </tbody>
      </table>
      <div ref={loaderRef} />
    </div>
  );
};
