import { useHistory, useLocation } from 'react-router-dom';
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
  const { isLoading, error, news } = useSelector((state) => state.news);
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { push } = useHistory();

  const sortParam = new URLSearchParams(search).get('sort');

  const sortOptions = {
    newest: 'publicationDate:desc',
    oldest: 'publicationDate:asc',
    relevance: 'publicationDate:desc',
  };

  const [sortFactor, setSortFactor] = useState(sortParam || '');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (sortFactor) {
      push(`?sort=${sortFactor}`);
    }
    dispatch(getNews({ searchTerm, sortFactor: sortOptions[sortFactor] }));
  }, [sortFactor]);

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
          {isLoading && <Loader />}
          {!isLoading && news.length === 0 ? (
            <p className={styles.text}>Nothing found matching your request 😕</p>
          ) : (
            news.map((newsItem) => <NewsCard news={newsItem} key={newsItem.id} />)
          )}
        </div>
      </section>
    </Container>
  );
};
