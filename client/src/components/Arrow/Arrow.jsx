import cn from 'classnames';
import styles from 'components/Arrow/Arrow.scss';

export const Arrow = ({
  id,
  className,
  angleClassName,
  isOpen,
  expandStyle,
  crossStyle,
  onClick,
  noStyle,
  ...props
}) => {
  return (
    <button
      id={id}
      className={cn(styles.arrowWrapper, className, {
        [styles.default]: !expandStyle && !crossStyle && !noStyle,
        [styles.expand]: expandStyle,
        [styles.cross]: crossStyle,
        [styles.open]: isOpen,
      })}
      onClick={onClick}
      {...props}
    >
      <span className={cn(styles.arrow, angleClassName)} />
      <span className={cn(styles.arrow, angleClassName)} />
    </button>
  );
};
