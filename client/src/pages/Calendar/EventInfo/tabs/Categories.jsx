import styles from 'pages/Calendar/EventInfo/tabs/Tabs.scss';

export const Categories = () => {
  return (
    <>
      <div className={styles.department}>
        <div className={styles.departmentHeader}>
          <span className={styles.name}>Name some name</span>
          <div className={styles.dateTime}>
            <time>09:00</time>/<time>13.06.2024</time>
          </div>
        </div>
        <div className={styles.category}>
          <span>Category name some category name</span>
          <span>Class</span>
          <span>Program</span>
          <span>Text</span>
          <span className={styles.count}>132</span>
        </div>
        <div className={styles.category}>
          <span>Category name</span>
          <span>Class</span>
          <span>Program</span>
          <span>Text</span>
          <span className={styles.count}>12</span>
        </div>
        <div className={styles.category}>
          <span>Category name</span>
          <span>Class</span>
          <span>Program</span>
          <span>Text</span>
          <span className={styles.count}>0</span>
        </div>
        <div className={styles.departmentTotals}>
          <span>Totals:</span>
          <span className={styles.count}>45</span>
        </div>
      </div>
    </>
  );
};
