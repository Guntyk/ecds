import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import cn from 'classnames';
import useElementOnScreen from 'hooks/useElementOnScreen';
import * as eventsActions from '../../../../../redux/features/eventsSlice';
import { formatDate } from 'helpers/formatDate';
import { pathnames } from 'constants/pathnames';
import { ErrorMessage } from 'components/ErrorMessage';
import dashboardStyles from 'pages/Ballroom/blocks/Dashboard/Dashboard.scss';
import styles from 'pages/Ballroom/blocks/Dashboard/Calendar/Calendar.scss';

export const Calendar = () => {
  const { isLoading, error, events } = useSelector((state) => state.events);
  const { calendarPage } = pathnames;
  const dispatch = useDispatch();
  const { push } = useHistory();

  const [containerRef, isVisible] = useElementOnScreen();

  useEffect(() => {
    if (isVisible && !events.length) {
      dispatch(eventsActions.getEvents());
    }
  }, [dispatch, isVisible, events.length]);

  const nearestEvents = events.length > 3 ? events.slice(0, 3) : events;

  return (
    <div ref={containerRef} className={cn(dashboardStyles.block, styles.block)} onClick={() => push(calendarPage)}>
      <h2 className={dashboardStyles.title}>
        Calendar<span>of competition</span> <span className={dashboardStyles.arrow} />
      </h2>
      <ul className={dashboardStyles.list}>
        {!error ? (
          !isLoading && events.length === 0 ? (
            <p className={styles.text}>The calendar is empty for now</p>
          ) : (
            nearestEvents.map(({ id, title, startDate, endDate, address }) => (
              <li className={cn(dashboardStyles.item, styles.item)} key={id}>
                <div className={styles.info}>
                  <time dateTime={startDate}>
                    <span className={styles.calendarIcon} />
                    {formatDate(startDate, endDate)}
                  </time>
                  <address>
                    <span className={styles.markerIcon} />
                    {address}
                  </address>
                </div>
                <strong>{title}</strong>
              </li>
            ))
          )
        ) : (
          <ErrorMessage error={error} />
        )}
        {isLoading && <p>Loading...</p>}
      </ul>
    </div>
  );
};
