import { Button } from 'components/Button';
import arrowRight from 'assets/icons/arrow-right-purple.svg';
import styles from 'components/NewsCard/NewsCard.scss';

export default function NewsCard({ news: { title, description, date, cover } }) {
  const buttonIcon = { alt: 'arrow right', src: arrowRight, side: 'right' };

  return (
    <article className={styles.card}>
      <img src={cover.src} alt={cover.alt} className={styles.cover} />
      <section className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.additionalInfo}>
          <span className={styles.date}>{date}</span>
          <Button buttonContent='Read more' iconData={buttonIcon} textStyle />
        </div>
      </section>
    </article>
  );
}
