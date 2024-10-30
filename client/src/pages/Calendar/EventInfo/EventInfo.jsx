import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { getEvents } from '@redux/features/eventsSlice';
import { getDanceStyleFromPath } from 'helpers/danceStyleUtils';
import { clearArrayFromNulls } from 'helpers/clearArrayFromNulls';
import { formatDateToMMYYYY } from 'helpers/formatDateToMMYYYY';
import { formatDate } from 'helpers/formatDate';
import { pathnames } from 'constants/pathnames';
import { ImageComponent } from 'components/Image';
import { Container } from 'components/Container';
import { Button } from 'components/Button';
import { Link } from 'components/Link';
import { Information } from 'pages/Calendar/EventInfo/tabs/Information';
import { Categories } from 'pages/Calendar/EventInfo/tabs/Categories';
import { Address } from 'pages/Calendar/EventInfo/tabs/Address';
import { Judges } from 'pages/Calendar/EventInfo/tabs/Judges';
import { Clubs } from 'pages/Calendar/EventInfo/tabs/Clubs';
import { NotFound } from 'pages/Services/NotFound';
import calendarIcon from 'assets/icons/calendar.svg';
import markerIcon from 'assets/icons/marker.svg';
import styles from 'pages/Calendar/EventInfo/EventInfo.scss';

export const EventInfo = () => {
  const { isLoading, events } = useSelector((state) => state.events);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [nextEventID, setNextEventID] = useState(0);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const pathnameParts = pathname.split('/');
  const currentDanceStyleCalendarLink = `/${clearArrayFromNulls(pathnameParts)[0]}${pathnames.calendarPage}`;

  useEffect(() => {
    const danceStyle = getDanceStyleFromPath(pathname);
    if (danceStyle && !events.length) {
      dispatch(getEvents({ danceStyle }));
    }
  }, []);

  useEffect(() => {
    if (events.length) {
      const currentEvent = events.find((event) => event.id === Number(id));
      setCurrentEvent(currentEvent);

      const currentEventIndex = events.indexOf(currentEvent);
      const nextEvent = events[currentEventIndex + 1];

      setNextEventID(nextEvent?.id ?? 0);
    }
  }, [events, pathname]);

  const tabs = { Information, Categories, Clubs, Judges, Address };
  const ActiveTab = Object.values(tabs)[activeTabIndex];

  const {
    type,
    title,
    entryForm,
    organization,
    organizer,
    startDate,
    endDate,
    cover,
    city,
    acceptRegistration,
    registrationEndDate,
  } = currentEvent || {};

  return currentEvent ? (
    <Container className={styles.page}>
      <nav className={styles.navigation}>
        <Link content='All events' path={currentDanceStyleCalendarLink} arrowLeft />
        {nextEventID ? <Link content='Next' path={`${currentDanceStyleCalendarLink}/${nextEventID}`} arrowRight /> : ''}
      </nav>
      <article className={styles.info}>
        <ImageComponent
          src={cover?.url || 'https://placehold.co/282x390'}
          alt={cover?.alternativeText || 'cover placeholder'}
          placeholder={cover?.placeholder}
          className={styles.cover}
        />
        <div className={styles.information}>
          <div className={styles.stats}>
            <span className={styles.type}>{type}</span>
            {acceptRegistration !== null && (
              <span className={cn(styles.status, { [styles.open]: acceptRegistration })}>{`Registration is ${
                acceptRegistration ? 'open' : 'closed'
              }`}</span>
            )}
          </div>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.additionalInfo}>
            <span>
              <img src={calendarIcon} alt='calendar' />
              {formatDate(startDate, endDate)}
            </span>
            <span>
              <img src={markerIcon} alt='marker' />
              {city}, {organization?.country}
            </span>
          </div>
          <table className={styles.table}>
            <tbody>
              {registrationEndDate && (
                <tr>
                  <td>Registration to</td>
                  <td>{formatDateToMMYYYY(registrationEndDate)}</td>
                </tr>
              )}
              <tr>
                <td>Organization</td>
                <td>
                  {organization?.website ? (
                    <Link
                      content={organization.shortName ?? organization.name}
                      path={`https://${organization.website}`}
                      external
                      noStyle
                    />
                  ) : (
                    organization.shortName ?? organization.name
                  )}
                </td>
              </tr>
              <tr>
                <td>Organizer</td>
                <td>{organizer}</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.buttons}>
            <Button text='Registration' className={styles.firstBtn} disabled={!acceptRegistration} normalStyle />
            <Button text='Entry form' className={styles.secondBtn} disabled={!entryForm} ghostStyle />
          </div>
          <nav className={styles.tabs}>
            {Object.keys(tabs).map((key, index) => (
              <Button
                noStyle
                onClick={() => setActiveTabIndex(index)}
                className={cn(styles.tab, { [styles.active]: activeTabIndex === index })}
                tabIndex={activeTabIndex === index ? -1 : 0}
                key={key}
              >
                {key}
              </Button>
            ))}
          </nav>
          <div className={styles.tabInner}>
            <ActiveTab event={currentEvent} />
          </div>
        </div>
      </article>
    </Container>
  ) : isLoading ? (
    <p>Loading...</p>
  ) : (
    <NotFound />
  );
};
