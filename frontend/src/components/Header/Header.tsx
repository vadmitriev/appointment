import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './Header.module.scss';

type HeaderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
  return <div>Header</div>;
};
