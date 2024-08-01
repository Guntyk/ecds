import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import * as newsActions from '../../../redux/features/newsSlice';
import { convertDateFormat } from 'helpers/convertDate';
import { ErrorMessage } from 'components/ErrorMessage';
import { ImageComponent } from 'components/Image';
import { pathnames } from 'constants/pathnames';
import { Container } from 'components/Container';
import { Link } from 'components/Link';
import { NotFound } from 'pages/NotFound';
import styles from 'pages/News/NewsInfo/NewsInfo.scss';

export const NewsInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { newsPage } = pathnames;
  const newsId = Number(id);

  const { isLoading, error, news } = useSelector((state) => state.news);
  const currentArticle = news.find((article) => article.id === newsId);
  const nextArticle = news[news.findIndex((article) => article.id === newsId) + 1];

  useEffect(() => {
    if (!news.length) {
      dispatch(newsActions.getNews());
    }
  }, [dispatch, news.length]);

  if (!isLoading && !currentArticle && news.length) {
    return <NotFound />;
  }

  const renderContent = () => {
    if (isLoading) {
      return <p className={styles.text}>Loading...</p>;
    }

    if (error) {
      return <ErrorMessage error={error} />;
    }

    if (!news.length) {
      return <p className={styles.text}>There is no news yet</p>;
    }

    const { title, media, publishedAt, description, content } = currentArticle;

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
            <p className={styles.date}>{convertDateFormat(publishedAt)}</p>
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
