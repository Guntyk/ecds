import alert from 'assets/icons/alert.svg';
import styles from 'components/ErrorMessage/ErrorMessage.scss';

export const ErrorMessage = ({ error }) => (
  <p className={styles.errorMessage}>
    <img src={alert} alt='alert' />
    {error}
  </p>
);
