import { Button } from 'components/Button';
import arrowRight from 'assets/icons/arrow-right-purple.svg';
import calendarIcon from 'assets/icons/calendar.svg';
import markerIcon from 'assets/icons/marker.svg';
import styles from 'pages/Calendar/EventCard/EventCard.scss';

export const EventCard = ({ event: { type, title, description, organization, organizer, date, town, cover } }) => {
  const buttonIcon = { alt: 'arrow right', src: arrowRight, side: 'right' };

  return (
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
          <tr>
            <td>Organization</td>
            <td>{organization}</td>
          </tr>
          <tr>
            <td>Organizer</td>
            <td>{organizer}</td>
          </tr>
        </table>
        <div className={styles.wrapper}>
          <div className={styles.additionalInfo}>
            <span>
              <img src={calendarIcon} alt='calendar' />
              {date}
            </span>
            <span>
              <img src={markerIcon} alt='marker' />
              {town}
            </span>
          </div>
          <Button buttonContent='Read more' iconData={buttonIcon} textStyle />
        </div>
      </section>
    </article>
  );
};
