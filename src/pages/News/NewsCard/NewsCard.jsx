import { convertDateFormat } from 'helpers/convertDate';
import { Link } from 'components/Link';
import styles from 'pages/News/NewsCard/NewsCard.scss';

export const NewsCard = ({ news: { id, title, description, publicationDate, cover } }) => (
  <article className={styles.card}>
    <img
      src={cover?.src || 'https://placehold.co/282'}
      alt={cover?.alt || 'cover placeholder'}
      className={styles.cover}
    />
    <section className={styles.info}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.additionalInfo}>
        <span className={styles.date}>{convertDateFormat(publicationDate)}</span>
        <Link text='Read more' path={`/news/${id}`} arrowRight />
      </div>
    </section>
  </article>
);
