import styles from 'components/Container/Container.scss';

export const Container = ({ children, maxWidth }) => {
  return (
    <div className={styles.container} {...(maxWidth ? { style: { maxWidth } } : {})}>
      {children}
    </div>
  );
};
