import { convertDateFormat } from 'helpers/convertDate';
import { Link } from 'components/Link';
import calendarIcon from 'assets/icons/calendar.svg';
import markerIcon from 'assets/icons/marker.svg';
import styles from 'pages/Calendar/EventCard/EventCard.scss';

export const EventCard = ({ event: { id, type, title, description, organization, organizer, date, town, cover } }) => (
  <article className={styles.card}>
    <img
      src={cover?.src || 'https://placehold.co/282x390'}
      alt={cover?.alt || 'cover placeholder'}
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
            <td>{organization}</td>
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
            {convertDateFormat(date)}
          </span>
          <span>
            <img src={markerIcon} alt='marker' />
            {town}
          </span>
        </div>
        <Link text='Read more' path={`/events/${id}`} arrowRight />
      </div>
    </section>
  </article>
);
