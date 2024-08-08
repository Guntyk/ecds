import cn from 'classnames';
import cross from 'assets/icons/cross-notification.svg';
import styles from 'components/Notification/Notification.scss';

export const Notification = ({ className, title, text, type, setIsActive, flyStyle }) => {
  const renderTitle = () => {
    switch (type) {
      case 'error':
        return 'Error occurred';
      default:
        return title;
    }
  };

  return (
    <aside className={cn(styles.notification, className, { [styles.fly]: flyStyle })}>
      <span className={cn(styles.icon, styles[type])} />
      <section className={styles.content}>
        <p className={styles.title}>{renderTitle()}</p>
        {text && <p className={styles.text}>{text}</p>}
      </section>
      {setIsActive && (
        <button className={cn(styles.icon, styles.cross)} onClick={() => setIsActive(false)} title='Close notification'>
          <img src={cross} alt='Cross' />
        </button>
      )}
    </aside>
  );
};
