import { mockedEvents } from 'constants/mockedData';
import { Container } from 'components/Container';
import { EventCard } from 'pages/Calendar/EventCard';
import styles from 'pages/Calendar/Calendar.scss';

export const Calendar = () => (
  <Container>
    <section className={styles.calendar}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>Calendar</h2>
        <p className={styles.subtitle}>Of competition</p>
      </div>
      <div className={styles.events}>
        {mockedEvents.length > 0 ? (
          mockedEvents.map((event) => <EventCard event={event} key={event.id} />)
        ) : (
          <p className={styles.text}>There is no events yet</p>
        )}
      </div>
    </section>
  </Container>
);
