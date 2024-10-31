import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { clearArrayFromNulls } from 'helpers/clearArrayFromNulls';
import { generateMediaURL } from 'helpers/generateMediaURL';
import { formatDate } from 'helpers/formatDate';
import { pathnames } from 'constants/pathnames';
import { ImageComponent } from 'components/Image';
import calendarIconMobile from 'assets/icons/calendar-mobile.svg';
import markerIconMobile from 'assets/icons/marker-mobile.svg';
import calendarIcon from 'assets/icons/calendar.svg';
import markerIcon from 'assets/icons/marker.svg';
import styles from 'pages/Calendar/EventCard/EventCard.scss';

export const EventCard = ({
  event: { slug, type, title, description, organization, organizer, startDate, endDate, cover, city, registration },
}) => {
  const { pathname } = useLocation();
  const { push } = useHistory();

  const pathnameParts = pathname.split('/');
  const currentDanceStyleCalendarLink = `/${clearArrayFromNulls(pathnameParts)[0]}${pathnames.calendarPage}`;

  const today = new Date();

  return (
    <article className={styles.card} onClick={() => push(`${currentDanceStyleCalendarLink}/${slug}`)}>
      <div className={styles.preview}>
        <ImageComponent
          src={generateMediaURL(cover?.url) || 'https://placehold.co/282x390'}
          alt={cover?.alternativeText || 'cover placeholder'}
          placeholder={cover?.placeholder}
          className={styles.cover}
        />
        <section className={styles.info}>
          <div className={styles.infoHeader}>
            <span className={styles.type}>{type}</span>
            {(today <= new Date(registration?.endDate) || today <= new Date(startDate)) &&
              typeof registration?.accept === 'boolean' && (
                <span
                  className={cn(styles.registrationStatus, { [styles.open]: registration?.accept })}
                >{`Registration is ${registration?.accept ? 'open' : 'closed'}`}</span>
              )}
          </div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <table className={styles.organizationInfo}>
            <tbody>
              <tr>
                <td>Organization</td>
                <td>{organization.shortName ?? organization.name}</td>
              </tr>
              <tr>
                <td>Organizer</td>
                <td>{organizer}</td>
              </tr>
            </tbody>
          </table>
          <DateLocation event={{ startDate, endDate, city, organization }} />
        </section>
      </div>
      <DateLocation event={{ startDate, endDate, city, organization }} mobile />
    </article>
  );
};

const DateLocation = ({ event: { startDate, endDate, city, organization }, mobile }) => (
  <div className={cn(styles.additionalInfo, { [styles.additionalInfoMobile]: mobile })}>
    <span>
      <img src={calendarIcon} className={styles.icon} alt='calendar' />
      <img src={calendarIconMobile} className={styles.mobileIcon} alt='calendar' />
      {formatDate(startDate, endDate)}
    </span>
    <span>
      <img src={markerIcon} className={styles.icon} alt='marker' />
      <img src={markerIconMobile} className={styles.mobileIcon} alt='marker' />
      {city}, {organization?.country}
    </span>
  </div>
);
