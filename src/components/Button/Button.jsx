import cn from 'classnames';
import styles from 'components/Button/Button.scss';

export const Button = ({ buttonContent, className, type, active, wideStyle, lightStyle, textStyle, ...props }) => {
  const buttonClasses = cn(
    styles.btn,
    {
      [styles.active]: active,
      [styles.btnDefault]: !wideStyle && !lightStyle && !textStyle,
      [styles.btnWide]: wideStyle,
      [styles.btnLight]: lightStyle,
      [styles.btnText]: textStyle,
    },
    className
  );

  return (
    <button className={buttonClasses} type={type || 'button'} {...(active && { tabIndex: -1 })} {...props}>
      {buttonContent}
    </button>
  );
};
