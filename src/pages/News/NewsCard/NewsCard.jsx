import { convertDateFormat } from 'helpers/convertDate';
import { Button } from 'components/Button';
import arrowRight from 'assets/icons/arrow-right-purple.svg';
import styles from 'pages/News/NewsCard/NewsCard.scss';

export const NewsCard = ({ news: { title, description, publicationDate, cover } }) => {
  const buttonIcon = { alt: 'arrow right', src: arrowRight, side: 'right' };

  return (
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
          <Button buttonContent='Read more' iconData={buttonIcon} textStyle />
        </div>
      </section>
    </article>
  );
};
