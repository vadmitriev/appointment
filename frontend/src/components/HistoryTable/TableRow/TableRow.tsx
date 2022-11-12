import React, { memo } from 'react';

import { IEventTableItem } from '@/interfaces';
import styles from './TableRow.module.scss';
import { formatDate } from '@/helpers';
import cn from 'classnames';
import { capitalize } from 'lodash';

interface TableRowProps {
  rowClassName: string;
  item: IEventTableItem;
  isFirstItem: boolean;
}

const TableRow: React.FC<TableRowProps> = ({
  rowClassName,
  item,
  isFirstItem,
}) => {
  const formattedName = isFirstItem
    ? item.name
        .replace('MedicationStatement', 'Medication')
        .replace('AllergyIntolerance', 'Allergy')
    : '';

  const trClass = cn(rowClassName, styles.row, {
    [styles.first]: isFirstItem,
  });

  const tdEventClass = cn(styles.event, {
    [styles[formattedName]]: isFirstItem,
    [styles.empty]: formattedName === '',
  });

  const detailsText =
    item.details && item.details.length > 200
      ? item.details.slice(0, 200) + '...'
      : item.details;

  const valuesText =
    item.values &&
    item.values.length > 0 &&
    item.values?.map((value) =>
      typeof value === 'string'
        ? `: ${value}`
        : `: ${value.value} ${value.unit}`,
    );

  return (
    <tr className={trClass}>
      <td className={tdEventClass}>{formattedName}</td>
      <td className={styles.details}>
        {capitalize(detailsText)}
        {valuesText}
      </td>
      <td className={styles.code}>{item.code}</td>
      <td className={cn(styles.date, { [styles.first]: isFirstItem })}>
        {formatDate(item.date)}
      </td>
    </tr>
  );
};

export default memo(TableRow);
