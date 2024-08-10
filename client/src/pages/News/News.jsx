import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as newsActions from '../../redux/features/newsSlice';
import { Container } from 'components/Container';
import { Loader } from 'components/Loader';
import { TryAgain } from 'pages/Services/TryAgain';
import { NewsCard } from 'pages/News/NewsCard';
import styles from 'pages/News/News.scss';

export const News = () => {
  const { isLoading, error, news } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!news.length) {
      dispatch(newsActions.getNews());
    }
  }, []);

  if (error) {
    return <TryAgain />;
  }

  return (
    <Container>
      <section className={styles.news}>
        <h2 className={styles.title}>All news</h2>
        <div className={styles.newsList}>
          {!isLoading && news.length === 0 ? (
            <p className={styles.text}>There is no news yet</p>
          ) : (
            news.map((news) => <NewsCard news={news} key={news.id} />)
          )}
          {isLoading && <Loader />}
        </div>
      </section>
    </Container>
  );
};
