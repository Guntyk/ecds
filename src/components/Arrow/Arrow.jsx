import cn from 'classnames';
import styles from 'components/Arrow/Arrow.scss';

export const Arrow = ({ id, className, isOpen, expandStyle }) => {
  return (
    <button
      id={id}
      className={cn(styles.arrowWrapper, className, {
        [styles.default]: !expandStyle,
        [styles.expand]: expandStyle,
        [styles.open]: isOpen,
      })}
    >
      <span className={styles.arrow} />
      <span className={styles.arrow} />
    </button>
  );
};
