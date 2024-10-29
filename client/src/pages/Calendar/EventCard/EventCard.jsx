import { formatDate } from 'helpers/formatDate';
import { ImageComponent } from 'components/Image';
import { Link } from 'components/Link';
import calendarIconMobile from 'assets/icons/calendar-mobile.svg';
import markerIconMobile from 'assets/icons/marker-mobile.svg';
import calendarIcon from 'assets/icons/calendar.svg';
import markerIcon from 'assets/icons/marker.svg';
import styles from 'pages/Calendar/EventCard/EventCard.scss';
import cn from 'classnames';

export const EventCard = ({
  event: { type, title, description, organization, organizer, startDate, endDate, cover, city, acceptRegistration },
}) => (
  <article className={styles.card}>
    <div className={styles.preview}>
      <ImageComponent
        src={cover?.url || 'https://placehold.co/282x390'}
        alt={cover?.alternativeText || 'cover placeholder'}
        placeholder={cover?.placeholder}
        className={styles.cover}
      />
      <section className={styles.info}>
        <div className={styles.infoHeader}>
          <span className={styles.type}>{type}</span>
          {acceptRegistration !== null && (
            <span className={cn(styles.registrationStatus, { [styles.open]: acceptRegistration })}>{`Registration is ${
              acceptRegistration ? 'open' : 'closed'
            }`}</span>
          )}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <table className={styles.organizationInfo}>
          <tbody>
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
        <DateLocation event={{ startDate, endDate, city, organization }} />
      </section>
    </div>
    <DateLocation event={{ startDate, endDate, city, organization }} mobile />
  </article>
);

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
