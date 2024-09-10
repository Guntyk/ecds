import { formatDate } from 'helpers/formatDate';
import { ImageComponent } from 'components/Image';
import { Link } from 'components/Link';
import calendarIcon from 'assets/icons/calendar.svg';
import markerIcon from 'assets/icons/marker.svg';
import styles from 'pages/Calendar/EventCard/EventCard.scss';

export const EventCard = ({
  event: { id, type, title, description, organization, organizer, startDate, endDate, address, cover },
}) => (
  <article className={styles.card}>
    <ImageComponent
      src={cover?.url || 'https://placehold.co/282x390'}
      alt={cover?.alternativeText || 'cover placeholder'}
      placeholder={cover?.placeholder}
      className={styles.cover}
    />
    <section className={styles.info}>
      <span className={styles.type}>{type}</span>
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
      <div className={styles.wrapper}>
        <div className={styles.additionalInfo}>
          <span>
            <img src={calendarIcon} alt='calendar' />
            {formatDate(startDate, endDate)}
          </span>
          <span>
            <img src={markerIcon} alt='marker' />
            {address}
          </span>
        </div>
        {/* <Link content='Read more' path={`/events/${id}`} arrowRight /> */}
      </div>
    </section>
  </article>
);
