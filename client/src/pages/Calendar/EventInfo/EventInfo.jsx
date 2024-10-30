import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { getEvents } from '@redux/features/eventsSlice';
import { formatDateToEUFormat } from 'helpers/formatDateToEUFormat';
import { clearArrayFromNulls } from 'helpers/clearArrayFromNulls';
import { getDanceStyleFromPath } from 'helpers/danceStyleUtils';
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
  const [tabs, setTabs] = useState({});
  const { isLoading, events } = useSelector((state) => state.events);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [nextEventID, setNextEventID] = useState(0);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const pathnameParts = pathname.split('/');
  const currentDanceStyleCalendarLink = `/${clearArrayFromNulls(pathnameParts)[0]}${pathnames.calendarPage}`;
  const today = new Date();

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

  const {
    type,
    title,
    description,
    entryForm,
    organization,
    organizer,
    startDate,
    endDate,
    cover,
    city,
    registration,
    information,
    address,
    departments,
  } = currentEvent || {};

  useEffect(() => {
    if (description || information) {
      setTabs((prevTabs) => ({ Information, ...prevTabs }));
    }
    if (departments?.length) {
      setTabs((prevTabs) => ({ ...prevTabs, Categories }));
    }
    if (address?.address || address?.mapUrl) {
      setTabs((prevTabs) => ({ ...prevTabs, Address }));
    }
  }, [description, information, address]);

  const ActiveTab = Object.values(tabs)[activeTabIndex];

  return currentEvent ? (
    <Container className={styles.page}>
      <nav className={styles.navigation}>
        <Link content='All events' path={currentDanceStyleCalendarLink} arrowLeft />
        {nextEventID ? <Link content='Next' path={`${currentDanceStyleCalendarLink}/${nextEventID}`} arrowRight /> : ''}
      </nav>
      <article className={styles.info}>
        <ImageComponent
          src={process.env.REACT_APP_BASE_API_URL + cover?.url || 'https://placehold.co/282x390'}
          alt={cover?.alternativeText || 'cover placeholder'}
          placeholder={cover?.placeholder}
          className={styles.cover}
        />
        <div className={styles.information}>
          <div className={styles.stats}>
            <span className={styles.type}>{type}</span>
            {(today <= new Date(registration?.endDate) || today <= new Date(startDate)) &&
              typeof registration?.accept === 'boolean' && (
                <span className={cn(styles.status, { [styles.open]: registration?.accept })}>{`Registration is ${
                  registration?.accept ? 'open' : 'closed'
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
              {registration?.endDate && (
                <tr>
                  <td>Registration to</td>
                  <td>{formatDateToEUFormat(registration?.endDate)}</td>
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
            <Button
              text='Registration'
              className={styles.firstBtn}
              onClick={() => window.open(registration?.url)}
              disabled={!registration?.url}
              normalStyle
            />
            <Button
              text='Entry form'
              className={styles.secondBtn}
              onClick={() => window.open(entryForm?.url)}
              disabled={!entryForm}
              ghostStyle
            />
          </div>
          {Object.values(tabs).length && (
            <>
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
              <div className={styles.tabInner}>{ActiveTab && <ActiveTab event={currentEvent} />}</div>
            </>
          )}
        </div>
      </article>
    </Container>
  ) : isLoading ? (
    <p>Loading...</p>
  ) : (
    <NotFound />
  );
};
