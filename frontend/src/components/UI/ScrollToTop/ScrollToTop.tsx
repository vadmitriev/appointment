import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState,
} from 'react';
import ArrowIcon from '@/assets/icons/arrow.svg';
import styles from './ScrollToTop.module.scss';

type ScrollToTopProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ ...props }) => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  if (!showTopBtn) {
    return null;
  }

  return (
    <div className={styles.btn} onClick={goToTop} {...props}>
      <img src={ArrowIcon} alt="To Top" />
    </div>
  );
};
