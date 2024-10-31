import { formatDateTimeToTime } from 'helpers/formatDateTimeToTime';
import { formatDateToEUFormat } from 'helpers/formatDateToEUFormat';
import styles from 'pages/Calendar/EventInfo/tabs/Categories/Categories.scss';

export const Categories = ({ event: { departments } }) =>
  departments.map(({ name, startTime, categories }) => (
    <div className={styles.department}>
      <div className={styles.departmentHeader}>
        <span className={styles.name}>{name}</span>
        <div className={styles.dateTime}>
          <time>{formatDateTimeToTime(startTime)}</time>/<time>{formatDateToEUFormat(startTime)}</time>
        </div>
      </div>
      {categories &&
        categories.map(({ name, class: danceClass, program, entries }) => (
          <div className={styles.category}>
            <span>{name}</span>
            <span>{danceClass}</span>
            <span>{program}</span>
            <span className={styles.count}>{entries}</span>
          </div>
        ))}
      <div className={styles.departmentTotals}>
        <span>Totals:</span>
        <span className={styles.count}>
          {categories.reduce((totalEntries, category) => totalEntries + Number(category?.entries), 0)}
        </span>
      </div>
    </div>
  ));
