import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { getEvents } from '@redux/features/eventsSlice';
import { formatDateToEUFormat } from 'helpers/formatDateToEUFormat';
import { clearArrayFromNulls } from 'helpers/clearArrayFromNulls';
import { getDanceStyleFromPath } from 'helpers/danceStyleUtils';
import { generateMediaURL } from 'helpers/generateMediaURL';
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
import { Tabs } from 'components/Tabs';
import { NotFound } from 'pages/Services/NotFound';
import calendarIcon from 'assets/icons/calendar.svg';
import markerIcon from 'assets/icons/marker.svg';
import styles from 'pages/Calendar/EventInfo/EventInfo.scss';

export const EventInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabs, setTabs] = useState({});
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, setIsModalOpen]);

  const [registrationStatus, setRegistrationStatus] = useState('hidden');
  const { isLoading, events } = useSelector((state) => state.events);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [nextEventSlug, setNextEventSlug] = useState('');
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { slug } = useParams();

  const pathnameParts = pathname.split('/');
  const currentDanceStyleCalendarLink = `/${clearArrayFromNulls(pathnameParts)[0]}${pathnames.calendarPage}`;
  const today = new Date().setHours(0, 0, 0, 0);

  useEffect(() => {
    const danceStyle = getDanceStyleFromPath(pathname);
    if (danceStyle && !events.length) {
      dispatch(getEvents({ danceStyle }));
    }
  }, []);

  useEffect(() => {
    setCurrentEvent(null);
    if (events.length) {
      const currentEvent = events.find((event) => event.slug === slug);
      setCurrentEvent(currentEvent);

      const currentEventIndex = events.indexOf(currentEvent);
      const nextEvent = events[currentEventIndex + 1];

      setNextEventSlug(nextEvent?.slug ?? '');

      if (currentEvent) {
        const { startDate, endDate, registration } = currentEvent;
        const registrationStart = new Date(registration?.startDate).setHours(0, 0, 0, 0);
        const registrationEnd = new Date(registration?.endDate).setHours(0, 0, 0, 0);
        const eventStartDate = new Date(startDate).setHours(0, 0, 0, 0);
        const eventEndDate = new Date(endDate).setHours(0, 0, 0, 0);

        if (today < registrationStart) {
          setRegistrationStatus('hidden');
        } else if (today >= registrationStart && today <= registrationEnd) {
          setRegistrationStatus('open');
        } else if (today > registrationEnd && (today <= eventEndDate || today <= eventStartDate)) {
          setRegistrationStatus('closed');
        } else {
          setRegistrationStatus('hidden');
        }
      }
    }
  }, [events, pathname]);

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
    registration,
    description,
    information,
    departments,
    judges,
    address,
  } = currentEvent || {};

  useEffect(() => {
    if (description || information) {
      setTabs((prevTabs) => ({ Information, ...prevTabs }));
    }
    if (departments?.length) {
      setTabs((prevTabs) => ({ ...prevTabs, Categories }));
    }
    if (judges?.length) {
      setTabs((prevTabs) => ({ ...prevTabs, Judges }));
    }
    if (address) {
      setTabs((prevTabs) => ({ ...prevTabs, Address }));
    }
  }, [currentEvent]);

  return currentEvent ? (
    <Container className={styles.page}>
      <nav className={styles.navigation}>
        <Link content='All events' path={currentDanceStyleCalendarLink} arrowLeft />
        {nextEventSlug && <Link content='Next' path={`${currentDanceStyleCalendarLink}/${nextEventSlug}`} arrowRight />}
      </nav>
      <article className={styles.info}>
        <ImageComponent
          src={generateMediaURL(cover?.url) || 'https://placehold.co/282x390'}
          alt={cover?.alternativeText || 'cover placeholder'}
          placeholder={cover?.placeholder}
          className={styles.cover}
        />
        <div className={styles.information}>
          <div className={styles.stats}>
            <span className={styles.type}>{type}</span>
            {registrationStatus !== 'hidden' && (
              <span className={cn(styles.status, styles[registrationStatus])}>
                {`Registration is ${registrationStatus}`}
              </span>
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
          <ImageComponent
            src={generateMediaURL(cover?.url) || 'https://placehold.co/282x390'}
            alt={cover?.alternativeText || 'cover placeholder'}
            placeholder={cover?.placeholder}
            className={cn(styles.cover, styles.coverMobile)}
          />
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
                      hoverStyle
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
              onClick={() =>
                title === 'ECDS European Championship' ? setIsModalOpen(true) : window.open(registration?.url)
              }
              disabled={registrationStatus !== 'open'}
              normalStyle
            />
            <Button
              text='Entry form'
              className={styles.secondBtn}
              onClick={() => window.open(generateMediaURL(entryForm?.url))}
              disabled={!entryForm}
              ghostStyle
            />
          </div>
          <Tabs className={styles.tabs} tabs={tabs} setTabs={setTabs} data={currentEvent} />
        </div>
      </article>
      <Tabs className={cn(styles.tabs, styles.tabsMobile)} tabs={tabs} setTabs={setTabs} data={currentEvent} />
      <div className={cn(styles.overlay, { [styles.active]: isModalOpen })}></div>
      <div className={cn(styles.modal, { [styles.active]: isModalOpen })} ref={modalRef}>
        <p>
          To apply for participation in the European Championship, you must register in the e-phan database. The
          application must be confirmed by one of the{' '}
          <Link
            className={styles.modalLink}
            path='https://euro-dance.org/members'
            content='national organizations'
            hoverStyle
            noStyle
            external
          />
          .
        </p>
        <p>
          If the dancer is from a country that is not on{' '}
          <Link path='https://euro-dance.org/members' content='this list' hoverStyle noStyle external />, then his
          application will be confirmed by the Committee of Independent Dancers of the ECDS.
        </p>
        <p>
          If your club and coach are already registered in e-phan database, you will be able to select them during
          registration. If not, ask them to do so before your registration.
        </p>
        <Button
          className={styles.modalBtn}
          text='Continue to registration'
          onClick={() => {
            window.open(registration?.url);
            setIsModalOpen(false);
          }}
          normalStyle
        />
      </div>
    </Container>
  ) : isLoading ? (
    <p>Loading...</p>
  ) : (
    <NotFound />
  );
};
