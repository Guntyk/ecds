import styles from 'pages/Calendar/EventInfo/tabs/Tabs.scss';

export const Address = () => {
  return (
    <div className={styles.address}>
      <h4>Country, city Name, Long name street, building 55</h4>
      <div className={styles.map}></div>
    </div>
  );
};
