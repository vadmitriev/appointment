import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './Footer.module.scss';
import cn from 'classnames';

type FooterProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Footer: React.FC<FooterProps> = ({ className, ...props }) => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <span>
        <a href="https://github.com/vadmitriev/" target="_new" rel="follow">
          Владимир Дмитриев
        </a>
      </span>
    </footer>
  );
};
