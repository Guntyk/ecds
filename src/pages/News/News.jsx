import { mockedNews } from 'constants/mockedData';
import { Container } from 'components/Container';
import { NewsCard } from 'pages/News/NewsCard';
import styles from 'pages/News/News.scss';

export const News = () => (
  <Container>
    <section className={styles.news}>
      <h2 className={styles.title}>All news</h2>
      <div className={styles.newsList}>
        {mockedNews.length > 0 ? (
          mockedNews.map((news) => <NewsCard news={news} />)
        ) : (
          <p className={styles.text}>There is no news yet</p>
        )}
      </div>
    </section>
  </Container>
);
