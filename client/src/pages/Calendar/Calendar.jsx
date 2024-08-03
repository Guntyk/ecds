import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as eventsActions from '../../redux/features/eventsSlice';
import { ErrorMessage } from 'components/ErrorMessage';
import { Container } from 'components/Container';
import { EventCard } from 'pages/Calendar/EventCard';
import styles from 'pages/Calendar/Calendar.scss';

export const Calendar = () => {
  const { isLoading, error, events } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!events.length) {
      dispatch(eventsActions.getEvents());
    }
  }, []);

  return (
    <Container>
      <section className={styles.calendar}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Calendar</h2>
          <p className={styles.subtitle}>Of competition</p>
        </div>
        <div className={styles.events}>
          {!error ? (
            !isLoading && events.length === 0 ? (
              <p className={styles.text}>The calendar is temporarily empty</p>
            ) : (
              events.map((event) => <EventCard event={event} key={event.id} />)
            )
          ) : (
            <ErrorMessage error={error} />
          )}
          {isLoading && <p className={styles.text}>Loading...</p>}
        </div>
      </section>
    </Container>
  );
};
