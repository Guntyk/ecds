import cn from 'classnames';
import { formatDateToEUFormat } from 'helpers/formatDateToEUFormat';
import styles from 'pages/Calendar/EventInfo/tabs/Categories/Categories.scss';

export const Categories = ({ event: { registration, departments } }) =>
  departments.map(({ id, name, startDate, startTime, categories }) => (
    <div className={styles.department} key={id}>
      <div className={styles.departmentHeader}>
        <span className={styles.name}>{name}</span>
        <div className={styles.dateTime}>
          {startTime && (
            <>
              <time>{startTime.slice(0, 5)}</time>/
            </>
          )}
          <time>{formatDateToEUFormat(startDate)}</time>
        </div>
      </div>
      {categories &&
        categories.map(({ id, name, class: danceClass, dances, participants, program, entries }) => (
          <div className={cn(styles.category, { [styles.rounded]: !registration?.accept })} key={id}>
            <span className={styles.categoryName}>{name}</span>
            <span className={styles.participants}>{participants}</span>
            <div className={styles.group}>
              <span>{name}</span>
              <span>{participants}</span>
            </div>
            <span className={styles.program}>{program}</span>
            <span className={styles.dances}>{dances.map(({ shortName }) => shortName).join(', ')}</span>
            <div className={styles.group}>
              <span>{program}</span>
              <span>{dances.map(({ shortName }) => shortName).join(', ')}</span>
            </div>
            <span className={styles.danceClass}>{danceClass}</span>
            {registration?.accept && <span className={styles.count}>{entries}</span>}
          </div>
        ))}
      {registration?.accept && (
        <div className={styles.departmentTotals}>
          <span>Totals:</span>
          <span className={styles.count}>
            {categories.reduce((totalEntries, category) => totalEntries + Number(category?.entries), 0)}
          </span>
        </div>
      )}
    </div>
  ));
