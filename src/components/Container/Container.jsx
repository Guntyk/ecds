import styles from 'components/Container/Container.scss';

export const Container = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};
