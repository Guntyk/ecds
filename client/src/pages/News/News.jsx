import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNews } from "hooks/useNews";
import { getNews } from "@redux/features/newsSlice";
import { Container } from "components/Container";
import { Dropdown } from "components/Dropdown";
import { Button } from "components/Button";
import { Loader } from "components/Loader";
import { Input } from "components/Input";
import { TryAgain } from "pages/Services/TryAgain";
import { NewsCard } from "pages/News/NewsCard";
import styles from "pages/News/News.scss";

import ne from "../ne.json";

const neParse = JSON.parse(ne);

export const News = () => {
  const { isLoading, error, news } = useSelector((state) => state.news);
  const { getCurrentPageNews } = useNews();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { push } = useHistory();

  const searchParam = new URLSearchParams(search);

  const sortOptions = {
    relevance: "relevance",
    newest: "publicationDate:desc",
    oldest: "publicationDate:asc",
  };

  const [sortFactor, setSortFactor] = useState(searchParam.get("sort") || "");
  const [searchTerm, setSearchTerm] = useState(searchParam.get("query") || "");

  const updateSearchString = () => {
    if (sortFactor) {
      searchParam.set("sort", sortFactor);
    } else {
      searchParam.delete("sort");
    }

    if (searchTerm) {
      searchParam.set("query", searchTerm);
    } else {
      searchParam.delete("query");
    }
    push({ search: searchParam.toString() });
  };

  useEffect(() => {
    updateSearchString();
  }, [sortFactor]);

  useEffect(() => {
    dispatch(
      getNews({
        searchTerm,
        sortFactor: sortOptions[sortFactor],
        getCurrentPageNews,
      })
    );
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    updateSearchString();
  };

  // if (error) {
  //   return <TryAgain />;
  // }

  return (
    <Container>
      <section className={styles.news}>
        <header className={styles.header}>
          <h2 className={styles.title}>All news</h2>
          <form className={styles.search} onSubmit={handleSearch}>
            <Dropdown
              className={styles.sort}
              options={Object.keys(sortOptions)}
              placeholder={Object.keys(sortOptions)[1]}
              selectedValue={sortFactor}
              onChange={setSortFactor}
            />
            <div className={styles.searchTerm}>
              <Input
                wrapperClassName={styles.searchInput}
                labelText="Enter Search Terms"
                inputValue={searchTerm}
                setInputValue={setSearchTerm}
              />
              <Button
                className={styles.searchBtn}
                text="Search"
                type="submit"
                searchStyle
              />
            </div>
          </form>
        </header>
        <div className={styles.newsList}>
          {isLoading && <Loader />}
          {!isLoading && neParse.length === 0 ? (
            <p className={styles.text}>
              Nothing found matching your request 😕
            </p>
          ) : (
            neParse.map((newsItem) => (
              <NewsCard news={newsItem} key={newsItem.id} />
            ))
          )}
        </div>
      </section>
    </Container>
  );
};
