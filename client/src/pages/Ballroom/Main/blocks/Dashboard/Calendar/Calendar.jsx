import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import cn from 'classnames';
import useElementOnScreen from 'hooks/useElementOnScreen';
import { getEvents } from '@redux/features/eventsSlice';
import { formatDate } from 'helpers/formatDate';
import { pathnames } from 'constants/pathnames';
import { Notification } from 'components/Notification';
import { Loader } from 'components/Loader';
import { Link } from 'components/Link';
import dashboardStyles from 'pages/Ballroom/Main/blocks/Dashboard/Dashboard.scss';
import styles from 'pages/Ballroom/Main/blocks/Dashboard/Calendar/Calendar.scss';

export const Calendar = () => {
  const { isLoading, error, events } = useSelector((state) => state.events);
  const { calendarPage, ballroomPage } = pathnames;
  const today = new Date().setHours(0, 0, 0, 0);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const [containerRef, isVisible] = useElementOnScreen();

  useEffect(() => {
    if (!error && isVisible && !events.length) {
      dispatch(getEvents({ danceStyle: 'Ballroom' }));
    }
  }, [isVisible, events.length]);

  const futureEvents = events.filter(({ startDate, endDate }) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    return end ? end >= today : start >= today;
  });

  const nearestEvents = futureEvents.length > 3 ? futureEvents.slice(0, 3) : futureEvents;

  return (
    <div ref={containerRef} className={cn(dashboardStyles.block, styles.block)}>
      <h2 className={dashboardStyles.title} onClick={() => push(`${ballroomPage}${calendarPage}`)}>
        Calendar<span>of competition</span>
        <span className={cn(dashboardStyles.arrow, styles.arrow)} />
        <span className={cn(dashboardStyles.arrow, styles.arrow)} />
      </h2>
      <ul className={dashboardStyles.list}>
        {!error ? (
          isLoading ? (
            <Loader className={dashboardStyles.loader} />
          ) : nearestEvents.length === 0 ? (
            <p className={styles.text}>The calendar is empty for now</p>
          ) : (
            nearestEvents.map(({ id, title, startDate, endDate, organization, city, slug }) => (
              <li className={cn(dashboardStyles.item, styles.item)} key={id}>
                <Link path={`${ballroomPage}${calendarPage}/${slug}`} noStyle>
                  <div className={styles.info}>
                    <time dateTime={startDate}>
                      <span className={styles.calendarIcon} />
                      {formatDate(startDate, endDate)}
                    </time>
                    <address>
                      <span className={styles.markerIcon} />
                      {city}, {organization.country}
                    </address>
                  </div>
                  <strong className={styles.titleCalendar}>{title}</strong>
                </Link>
              </li>
            ))
          )
        ) : (
          <Notification className={dashboardStyles.error} text={error} type='error' />
        )}
      </ul>
    </div>
  );
};
