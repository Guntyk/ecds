import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import cn from "classnames";
import useElementOnScreen from "hooks/useElementOnScreen";
import { useNews } from "hooks/useNews";
import { getNews } from "@redux/features/newsSlice";
import { formatDate } from "helpers/formatDate";
import { pathnames } from "constants/pathnames";
import { Notification } from "components/Notification";
import { Loader } from "components/Loader";
import dashboardStyles from "pages/Ballroom/Main/blocks/Dashboard/Dashboard.scss";
import styles from "pages/Ballroom/Main/blocks/Dashboard/News/News.scss";

import ne from "../../../../../ne.json";

const neParse = JSON.parse(ne);

export const News = () => {
  const { isLoading, error, news } = useSelector((state) => state.news);
  const { newsPage, ballroomPage } = pathnames;
  const { getCurrentPageNews } = useNews();
  const dispatch = useDispatch();
  const { push } = useHistory();

  const [containerRef, isVisible] = useElementOnScreen();

  useEffect(() => {
    if (
      !error & isVisible &&
      !news.includes(({ pages }) =>
        pages.some((page) => ballroomPage.includes(page))
      )
    ) {
      dispatch(getNews({ getCurrentPageNews }));
    }
  }, [isVisible, news.length]);

  const nearestNews = news.length > 3 ? news.slice(0, 3) : news;

  return (
    <div ref={containerRef} className={cn(dashboardStyles.block, styles.block)}>
      <h2
        className={cn(dashboardStyles.title, styles.title)}
        onClick={() => push(`${ballroomPage}${newsPage}`)}
      >
        Latest news
        <span className={cn(dashboardStyles.arrow, styles.arrow)} />
        <span className={cn(dashboardStyles.arrow, styles.arrow)} />
      </h2>
      <ul className={dashboardStyles.list}>
        {isLoading ? (
          <Loader className={dashboardStyles.loader} />
        ) : neParse.length === 0 ? (
          <p className={styles.text}>There is no news yet</p>
        ) : (
          neParse.map(({ id, title, publicationDate }) => (
            <li
              className={cn(dashboardStyles.item, styles.item)}
              onClick={() => push(`${newsPage}/${id}`)}
              key={id}
            >
              <time dateTime={publicationDate}>
                <span className={dashboardStyles.calendarIcon} />
                {formatDate(publicationDate)}
              </time>
              <strong>{title}</strong>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
