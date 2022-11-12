import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';

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
    <button className={cn(className, styles.btn)} {...props}>
      {children}
    </button>
  );
};
