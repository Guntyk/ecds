import { useHistory } from "react-router-dom";
import { formatDate } from "helpers/formatDate";
import { pathnames } from "constants/pathnames";
import { ImageComponent } from "components/Image";
import styles from "pages/News/NewsCard/NewsCard.scss";

export const NewsCard = ({
  news: { id, title, description, publicationDate, media, views, tags, author },
}) => {
  const { newsPage } = pathnames;
  const { push } = useHistory();

  const openArticle = () => push(`${newsPage}/${id}`);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      openArticle();
    }
  };

  return (
    <article className={styles.article}>
      <section className={styles.characteristic}>
        <ul className={styles.tags}>
          {tags.map(({ id, tag }) => (
            <li className={styles.tag} key={id}>
              {tag.trim()}
            </li>
          ))}
        </ul>
        {author && <p className={styles.author}>by {author.trim()}</p>}
      </section>
      <section
        className={styles.card}
        onClick={openArticle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Open article: ${title}`}
      >
        <ImageComponent
          src={media?.[0].url || "https://placehold.co/282"}
          alt={media?.[0].alt || "Cover placeholder"}
          placeholder={media?.[0].placeholder}
          className={styles.cover}
          external={media}
        />
        <section className={styles.info}>
          <h3 className={styles.title}>{title.trim()}</h3>
          <p className={styles.description}>{description.trim()}</p>
          <div className={styles.additionalInfo}>
            <span className={styles.date}>{formatDate(publicationDate)}</span>
            <div className={styles.views}>
              <span className={styles.viewsIcon} />
              {views}
            </div>
          </div>
        </section>
      </section>
    </article>
  );
};
