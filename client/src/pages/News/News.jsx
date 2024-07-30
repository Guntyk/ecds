import { useState } from 'react';
import { Container } from 'components/Container';
import { NewsCard } from 'pages/News/NewsCard';
import styles from 'pages/News/News.scss';

export const News = () => {
  const [news, setNews] = useState([]);

  return (
    <Container>
      <section className={styles.news}>
        <h2 className={styles.title}>All news</h2>
        <div className={styles.newsList}>
          {news.length > 0 ? (
            news.map((news) => <NewsCard news={news} key={news.id} />)
          ) : (
            <p className={styles.text}>There is no news yet</p>
          )}
        </div>
      </section>
    </Container>
  );
};
