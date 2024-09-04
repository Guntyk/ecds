import cn from 'classnames';
import styles from 'components/Container/Container.scss';

export const Container = ({ children, className, maxWidth }) => {
  return (
    <div className={cn(styles.container, className)} {...(maxWidth ? { style: { maxWidth } } : {})}>
      {children}
    </div>
  );
};
