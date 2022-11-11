import { IEvent, IEventTableItem } from '@/interfaces';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Loader } from '@/components';
import { getItemsSlice } from '@/helpers';
import styles from './HistoryTable.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { historyActions } from '@/store/history/historySlice';
import { throttle } from 'lodash';

interface HistoryTableProps {}

export const HistoryTable: React.FC<HistoryTableProps> = () => {
  // const [page, setPage] = useState<number>(0);
  // const [visibleItems, setVisibleItems] = useState<IEventTableItem[]>(
  //   getItemsSlice<IEventTableItem>(items, page, VISIBLE_ITEMS_COUNT),
  // );

  const dispatch = useAppDispatch();
  const { page, itemsPerPage, events, resources } = useAppSelector(
    (state) => state.history,
  );

  const [visibleItems, setVisibleItems] = useState(
    getItemsSlice(events, page, itemsPerPage),
  );

  const [isLoading, setIsloading] = useState<boolean>(false);

  const loaderRef = useRef<HTMLDivElement>(null);

  const handleObserver = throttle((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setIsloading(true);
      dispatch(historyActions.setPage(page + 1));
      setIsloading(false);
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
    const newItems = getItemsSlice(events, page, itemsPerPage);
    setVisibleItems(visibleItems.concat(newItems));
  }, [page]);

  if (events.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <Loader visible={isLoading} />
      </div>

      <table className={styles.table}>
        <thead>
          <tr className={styles.head}>
            <th>Event type</th>
            <th>Details</th>
            <th>Code</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {visibleItems.map((item, i) => {
            const isSameGroup =
              i > 0 && item.name === events[i - 1].name && item.appointmentId;
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
              </tr>
            );
            //   return <TableRow key={item.id} />;
          })}
          <Loader visible={isLoading} />
          <div ref={loaderRef} />
        </tbody>
      </table>
    </div>
  );
};

const TableRow = memo(
  ({ item, isSameGroup }: { item: IEvent; isSameGroup: boolean }) => (
    <tr className={styles.row}>
      <td className={styles.first}>
        {/* {!isSameGroup && (
        <p
          className={cn(
            s.colored,
            s[
              `${name
                .replace("Intolerance", "")
                .replace("Statement", "")
                .toLowerCase()}`
            ]
          )}
        >
          {name.replace("Intolerance", "").replace("Statement", "")}
        </p>
      )} */}
      </td>
      {/* <td className={s.second}> */}
      {/* {details}
        {!!values &&
          !!values.length &&
          values.map((val) =>
            typeof val === 'string'
              ? `: ${val}`
              : typeof val === 'object'
              ? `: ${val.value} ${val.unit}`
              : '',
          )}
      </td>
      <td className={s.pre_last}>{code}</td>
      <td className={s.last}>{formatDate(date)}</td> */}
    </tr>
  ),
);
