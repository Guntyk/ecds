import cn from 'classnames';
import styles from 'components/Loader/Loader.scss';

export const Loader = ({ className }) => (
  <div className={cn(styles.loaderWrapper, className)}>
    <div className={styles.loader} />
  </div>
);
