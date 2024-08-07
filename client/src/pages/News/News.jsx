import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as newsActions from '../../redux/features/newsSlice';
import { Notification } from 'components/Notification';
import { Container } from 'components/Container';
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

  return (
    <Container>
      <section className={styles.news}>
        <h2 className={styles.title}>All news</h2>
        <div className={styles.newsList}>
          {!error ? (
            !isLoading && news.length === 0 ? (
              <p className={styles.text}>There is no news yet</p>
            ) : (
              news.map((news) => <NewsCard news={news} key={news.id} />)
            )
          ) : (
            <Notification text={error} type='error' />
          )}
          {isLoading && <p className={styles.text}>Loading...</p>}
        </div>
      </section>
    </Container>
  );
};
