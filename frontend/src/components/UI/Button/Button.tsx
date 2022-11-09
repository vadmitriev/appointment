import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './Button.module.scss';

type ButtonProps = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button className={`${className} ${styles.btn}`} {...props}>
      {children}
    </button>
  );
};
