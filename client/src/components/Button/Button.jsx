import cn from 'classnames';
import styles from 'components/Button/Button.scss';

export const Button = ({
  children,
  text,
  className,
  type,
  normalStyle,
  ghostStyle,
  filterStyle,
  large,
  small,
  noStyle,
  ...props
}) => {
  const buttonClasses = cn(
    {
      [styles.btn]: !noStyle,
      [styles.btnNormal]: normalStyle,
      [styles.btnGhost]: ghostStyle,
      [styles.large]: large,
      [styles.small]: small,
    },
    className
  );

  return (
    <button className={buttonClasses} type={type || 'button'} {...props}>
      {children ?? text}
    </button>
  );
};
