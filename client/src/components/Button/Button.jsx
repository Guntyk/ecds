import cn from 'classnames';
import styles from 'components/Button/Button.scss';

export const Button = ({
  children,
  buttonContent,
  className,
  type,
  iconData,
  lightStyle,
  textStyle,
  headerStyle,
  noStyle,
  ...props
}) => {
  const buttonClasses = cn(
    styles.btn,
    {
      [styles.btnDefault]: !lightStyle && !textStyle && !headerStyle && !noStyle,
      [styles.btnLight]: lightStyle,
      [styles.btnText]: textStyle,
    },
    className
  );

  const { alt, src, side } = iconData || {};

  return (
    <button className={buttonClasses} type={type || 'button'} {...props}>
      {side === 'left' && <img src={src} alt={alt} className={styles.icon} />}
      {children ?? buttonContent}
      {side === 'right' && <img src={src} alt={alt} className={styles.icon} />}
    </button>
  );
};
