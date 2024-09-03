import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEvents } from "@redux/features/eventsSlice";
import { Container } from "components/Container";
import { Loader } from "components/Loader";
import { EventCard } from "pages/Calendar/EventCard";
import { TryAgain } from "pages/Services/TryAgain";
import styles from "pages/Calendar/Calendar.scss";

import ev from "../ev.json";

const evParse = JSON.parse(ev);

export const Calendar = () => {
  const { isLoading, error, events } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!events.length) {
      dispatch(getEvents());
    }
  }, []);

  // if (error) {
  //   return <TryAgain />;
  // }

  return (
    <Container>
      <section className={styles.calendar}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Calendar</h2>
          <p className={styles.subtitle}>Of competition</p>
        </div>
        <div className={styles.events}>
          {isLoading ? (
            <Loader />
          ) : evParse.length === 0 ? (
            <p className={styles.text}>The calendar is temporarily empty</p>
          ) : (
            evParse.map((event) => <EventCard event={event} key={event.id} />)
          )}
        </div>
      </section>
    </Container>
  );
};
