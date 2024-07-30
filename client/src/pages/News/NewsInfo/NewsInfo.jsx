import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { convertDateFormat } from 'helpers/convertDate';
import { mockedNews } from 'constants/mockedData';
import { pathnames } from 'constants/pathnames';
import { Container } from 'components/Container';
import { Link } from 'components/Link';
import styles from 'pages/News/NewsInfo/NewsInfo.scss';

export const NewsInfo = () => {
  const [nextNewsIndex, setNextNewsIndex] = useState(null);
  const [currentNews, setCurrentNews] = useState(null);
  const { newsPage } = pathnames;
  const { id } = useParams();

  useEffect(() => {
    const newsId = Number(id);
    const news = mockedNews.find((news) => news.id === newsId);
    setCurrentNews(news);

    const nextNewsIndex = mockedNews.findIndex((news) => news.id === newsId) + 1;
    if (nextNewsIndex < mockedNews.length) {
      setNextNewsIndex(nextNewsIndex);
    } else {
      setNextNewsIndex(null);
    }
  }, [id]);

  const { title, cover, publicationDate, description, content } = currentNews || {};

  return (
    <Container>
      {currentNews ? (
        <div className={styles.block}>
          <nav className={styles.navigation}>
            <Link content='All news' path={newsPage} arrowLeft />
            {nextNewsIndex && <Link text='Next' path={`${newsPage}/${mockedNews[nextNewsIndex].id}`} arrowRight />}
          </nav>
          <article className={styles.news}>
            {cover && (
              <section className={styles.media}>
                <img className={styles.image} src={cover.src} alt={cover.alt} />
              </section>
            )}
            <section>
              <p className={styles.date}>{convertDateFormat(publicationDate)}</p>
              <h1 className={styles.title}>{title}</h1>
              {description && <h2 className={styles.description}>{description}</h2>}
              <div className={styles.content}>
                <BlocksRenderer content={content} />
              </div>
            </section>
          </article>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};
