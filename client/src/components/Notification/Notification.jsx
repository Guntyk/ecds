import cn from 'classnames';
import cross from 'assets/icons/cross-notification.svg';
import styles from 'components/Notification/Notification.scss';

export const Notification = ({ title, text, type, setIsActive, flyStyle }) => {
  return (
    <aside className={cn(styles.notification, { [styles.fly]: flyStyle })}>
      <span className={cn(styles.icon, styles[type])} />
      <section className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.text}>{text}</p>
      </section>
      <button className={styles.icon} onClick={() => setIsActive(false)} title='Close notification'>
        <img src={cross} alt='Cross' />
      </button>
    </aside>
  );
};
