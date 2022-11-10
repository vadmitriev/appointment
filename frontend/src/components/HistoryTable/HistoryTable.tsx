import { IEvent } from '@/interfaces';
import React, { memo } from 'react';
import styles from './HistoryTable.module.scss';

interface HistoryTableProps {
  items: IEvent[];
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ items }) => {
  return (
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
        {items.map((item, i) => {
          const isSameGroup =
            i > 0 && item.name === items[i - 1].name && item.appointmentId;
          return <div>item.name</div>;
          //   return <TableRow key={item.id} />;
        })}
      </tbody>
    </table>
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
