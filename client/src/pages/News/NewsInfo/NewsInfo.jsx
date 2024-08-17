import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getNews } from '@redux/features/newsSlice';
import { formatDate } from 'helpers/formatDate';
import { ImageComponent } from 'components/Image';
import { pathnames } from 'constants/pathnames';
import { Container } from 'components/Container';
import { Loader } from 'components/Loader';
import { Link } from 'components/Link';
import { NotFound } from 'pages/Services/NotFound';
import { TryAgain } from 'pages/Services/TryAgain';
import styles from 'pages/News/NewsInfo/NewsInfo.scss';

export const NewsInfo = () => {
  const { isLoading, error, news } = useSelector((state) => state.news);
  const { newsPage } = pathnames;
  const dispatch = useDispatch();
  const { id } = useParams();
  const newsId = Number(id);

  const currentArticle = news.find((article) => article.id === newsId);
  const nextArticle = news[news.findIndex((article) => article.id === newsId) + 1];

  useEffect(() => {
    if (!news.length) {
      dispatch(getNews());
    }
  }, []);

  if (!isLoading && !currentArticle && news.length) {
    return <NotFound />;
  }

  if (error) {
    return <TryAgain />;
  }

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (!news.length) {
      return <p className={styles.text}>There is no news yet</p>;
    }

    const { title, media, publicationDate, description, content } = currentArticle;

    return (
      <>
        <nav className={styles.navigation}>
          <Link content='All news' path={newsPage} arrowLeft />
          {nextArticle && <Link content='Next' path={`${newsPage}/${nextArticle.id}`} arrowRight />}
        </nav>
        <article className={styles.news}>
          {media && (
            <section className={styles.media}>
              {media.map(({ id, url, alternativeText, placeholder }) => (
                <ImageComponent
                  className={styles.image}
                  src={url}
                  alt={alternativeText}
                  placeholder={placeholder}
                  key={id}
                  external
                />
              ))}
            </section>
          )}
          <section>
            <p className={styles.date}>{formatDate(publicationDate)}</p>
            <h1 className={styles.title}>{title}</h1>
            {description && <h2 className={styles.description}>{description}</h2>}
            <div className={styles.content}>
              <BlocksRenderer content={content} />
            </div>
          </section>
        </article>
      </>
    );
  };

  return (
    <Container>
      <div className={styles.block}>{renderContent()}</div>
    </Container>
  );
};
