import cn from 'classnames';
import styles from 'components/Arrow/Arrow.scss';

export const Arrow = ({ id, className, isOpen, expandStyle, logoStyle, onClick }) => {
  return (
    <button
      id={id}
      className={cn(styles.arrowWrapper, className, {
        [styles.default]: !expandStyle && !logoStyle,
        [styles.expand]: expandStyle,
        [styles.logo]: logoStyle,
        [styles.open]: isOpen,
      })}
      onClick={onClick}
    >
      <span className={styles.arrow} />
      <span className={styles.arrow} />
    </button>
  );
};