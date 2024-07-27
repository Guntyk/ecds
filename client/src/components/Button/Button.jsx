import cn from 'classnames';
import styles from 'components/Button/Button.scss';

export const Button = ({ buttonContent, className, type, iconData, lightStyle, textStyle, headerStyle, ...props }) => {
  const buttonClasses = cn(
    styles.btn,
    {
      [styles.btnDefault]: !lightStyle && !textStyle && !headerStyle,
      [styles.btnLight]: lightStyle,
      [styles.btnText]: textStyle,
    },
    className
  );

  const { alt, src, side } = iconData || {};

  return (
    <button className={buttonClasses} type={type || 'button'} {...props}>
      {side === 'left' && <img src={src} alt={alt} className={styles.icon} />}
      {buttonContent}
      {side === 'right' && <img src={src} alt={alt} className={styles.icon} />}
    </button>
  );
};
