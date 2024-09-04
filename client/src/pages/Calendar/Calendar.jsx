import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getEvents } from '@redux/features/eventsSlice';
import { Container } from 'components/Container';
import { Loader } from 'components/Loader';
import { EventCard } from 'pages/Calendar/EventCard';
import { TryAgain } from 'pages/Services/TryAgain';
import styles from 'pages/Calendar/Calendar.scss';

export const Calendar = () => {
  const { isLoading, error, events } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!events.length) {
      dispatch(getEvents());
    }
  }, []);

  if (error) {
    return <TryAgain />;
  }

  return (
    <section className={styles.calendar}>
      <Container>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Calendar</h2>
          <p className={styles.subtitle}>Of competition</p>
        </div>
      </Container>
      <div className={styles.events}>
        {isLoading ? (
          <Loader />
        ) : events.length === 0 ? (
          <p className={styles.text}>The calendar is temporarily empty</p>
        ) : (
          events.map((event) => <EventCard event={event} key={event.id} />)
        )}
      </div>
    </section>
  );
};
