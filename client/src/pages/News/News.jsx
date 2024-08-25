import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getNews } from '@redux/features/newsSlice';
import { Container } from 'components/Container';
import { Dropdown } from 'components/Dropdown';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { Input } from 'components/Input';
import { TryAgain } from 'pages/Services/TryAgain';
import { NewsCard } from 'pages/News/NewsCard';
import styles from 'pages/News/News.scss';

export const News = () => {
  const sortOptions = {
    newest: 'publicationDate:desc',
    oldest: 'publicationDate:asc',
    relevance: 'publicationDate:desc',
  };

  const [sortFactor, setSortFactor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { isLoading, error, news } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews({ searchTerm, sortFactor: sortOptions[sortFactor] }));
  }, [dispatch, sortFactor]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getNews({ searchTerm, sortFactor: sortOptions[sortFactor] }));
  };

  if (error) {
    return <TryAgain />;
  }

  return (
    <Container>
      <section className={styles.news}>
        <header className={styles.header}>
          <h2 className={styles.title}>All news</h2>
          <form className={styles.search} onSubmit={handleSearch}>
            <Dropdown
              className={styles.sort}
              options={Object.keys(sortOptions)}
              placeholder={Object.keys(sortOptions)[0]}
              selectedValue={sortFactor}
              onChange={setSortFactor}
            />
            <div className={styles.searchTerm}>
              <Input
                wrapperClassName={styles.searchInput}
                labelText='Enter Search Terms'
                inputValue={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className={styles.searchBtn} text='Search' type='submit' searchStyle />
            </div>
          </form>
        </header>
        <div className={styles.newsList}>
          {!isLoading && news.length === 0 ? (
            <p className={styles.text}>There is no news yet</p>
          ) : (
            news.map((newsItem) => <NewsCard news={newsItem} key={newsItem.id} />)
          )}
          {isLoading && <Loader />}
        </div>
      </section>
    </Container>
  );
};
