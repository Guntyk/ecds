import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { getNews, updateViews } from '@redux/features/newsSlice';
import { formatDate } from 'helpers/formatDate';
import { ImageComponent } from 'components/Image';
import { pathnames } from 'constants/pathnames';
import { Container } from 'components/Container';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { Link } from 'components/Link';
import { NotFound } from 'pages/Services/NotFound';
import { TryAgain } from 'pages/Services/TryAgain';
import shareIcon from 'assets/icons/share.svg';
import styles from 'pages/News/NewsInfo/NewsInfo.scss';

const useArticles = (news, newsId) => {
  return useMemo(() => {
    const currentArticle = news.find((article) => article.id === newsId);
    const nextArticle = news[news.findIndex((article) => article.id === newsId) + 1];
    return { currentArticle, nextArticle };
  }, [news, newsId]);
};

export const NewsInfo = () => {
  const { isLoading, error, news } = useSelector((state) => state.news);
  const { newsPage } = pathnames;
  const dispatch = useDispatch();
  const { id } = useParams();
  const newsId = Number(id);

  const { currentArticle, nextArticle } = useArticles(news, newsId);

  useEffect(() => {
    if (!news.length) {
      dispatch(getNews());
    }
  }, []);

  useEffect(() => {
    if (news.length && currentArticle) {
      dispatch(updateViews(currentArticle));
    }
  }, [news.length, id]);

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

    const { title, media, publicationDate, description, content, views, tags, author } = currentArticle;

    return (
      <>
        <nav className={styles.navigation}>
          <Link content='All news' path={newsPage} arrowLeft />
          {nextArticle && <Link content='Next' path={`${newsPage}/${nextArticle.id}`} arrowRight />}
        </nav>
        <article className={styles.news}>
          {media && (
            <section className={styles.media}>
              {news.map(({ id, url, alternativeText, placeholder }) => (
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
            <ul className={styles.tags}>
              {tags.map(({ id, tag }) => (
                <li className={styles.tag} key={id}>
                  {tag}
                </li>
              ))}
            </ul>
            <h1 className={styles.title}>{title}</h1>
            {description && <h2 className={styles.description}>{description}</h2>}
            <div className={styles.credits}>
              <time dateTime={publicationDate} className={styles.date}>
                {formatDate(publicationDate)}
              </time>
              {author && <p className={styles.author}>by {author}</p>}
            </div>
            <hr className={styles.line} />
            <div className={styles.promotion}>
              <Button className={styles.shareBtn} ghostStyle>
                Share <img src={shareIcon} alt='Share article' />
              </Button>
              <p className={styles.views}>
                <span className={styles.viewsIcon} />
                {views}
              </p>
            </div>
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
