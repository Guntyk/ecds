import cn from 'classnames';
import styles from 'components/Arrow/Arrow.scss';

export const Arrow = ({
  id,
  className,
  angleClassName,
  isOpen,
  expandStyle,
  logoStyle,
  onClick,
  noStyle,
  ...props
}) => {
  return (
    <button
      id={id}
      className={cn(styles.arrowWrapper, className, {
        [styles.default]: !expandStyle && !logoStyle && !noStyle,
        [styles.expand]: expandStyle,
        [styles.logo]: logoStyle,
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
