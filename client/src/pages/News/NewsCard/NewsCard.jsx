import { convertDateFormat } from 'helpers/convertDate';
import { pathnames } from 'constants/pathnames';
import { ImageComponent } from 'components/Image';
import { Link } from 'components/Link';
import styles from 'pages/News/NewsCard/NewsCard.scss';

export const NewsCard = ({ news: { id, title, description, publishedAt, media } }) => {
  const { newsPage } = pathnames;

  return (
    <article className={styles.card}>
      <ImageComponent
        src={media[0]?.url || 'https://placehold.co/282'}
        alt={media[0]?.alt || 'cover placeholder'}
        placeholder={media[0]?.placeholder}
        className={styles.cover}
        external
      />
      <section className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.additionalInfo}>
          <span className={styles.date}>{convertDateFormat(publishedAt)}</span>
          <Link content='Read more' path={`${newsPage}/${id}`} arrowRight />
        </div>
      </section>
    </article>
  );
};
