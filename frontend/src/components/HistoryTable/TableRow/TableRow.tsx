import React from 'react';

import { IEventTableItem } from '@/interfaces';
import styles from './TableRow.module.scss';
import { formatDate } from '@/helpers';

interface TableRowProps {
  rowClassName: string;
  item: IEventTableItem;
  isFirstItem: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({
  rowClassName,
  item,
  isFirstItem,
}) => {
  const formattedName = isFirstItem
    ? item.name
        .replace('MedicationStatement', 'Medication')
        .replace('AllergyIntolerance', 'Allergy')
    : '';

  const rowClass = `${rowClassName} ${styles.row} ${
    isFirstItem && styles.first
  }`;

  const valuesText = item.values && item.values.length > 0;
  item.values?.map((value) =>
    typeof value === 'string' ? `, ${value}` : `${value.value} ${value.unit}`,
  );

  return (
    <tr className={rowClass}>
      <td
        className={
          isFirstItem ? `${styles.event} ${styles[formattedName]}` : ''
        }
      >
        {formattedName}
      </td>
      <td className={styles.details}>
        {item.details && item.details.length > 200
          ? item.details.slice(0, 200) + '...'
          : item.details}
        {valuesText}
      </td>
      <td className={styles.code}>{item.code}</td>
      <td className={`${styles.date} ${isFirstItem && styles.first}`}>
        {formatDate(item.date)}
      </td>
    </tr>
  );
};
