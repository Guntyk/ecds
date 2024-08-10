import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import cn from 'classnames';
import useElementOnScreen from 'hooks/useElementOnScreen';
import * as newsActions from '../../../../../../redux/features/newsSlice';
import { formatDate } from 'helpers/formatDate';
import { pathnames } from 'constants/pathnames';
import { Notification } from 'components/Notification';
import { Loader } from 'components/Loader';
import dashboardStyles from 'pages/Ballroom/Main/blocks/Dashboard/Dashboard.scss';
import styles from 'pages/Ballroom/Main/blocks/Dashboard/News/News.scss';

export const News = () => {
  const { isLoading, error, news } = useSelector((state) => state.news);
  const { newsPage } = pathnames;
  const dispatch = useDispatch();
  const { push } = useHistory();

  const [containerRef, isVisible] = useElementOnScreen();

  useEffect(() => {
    if (isVisible && !news.length) {
      dispatch(newsActions.getNews());
    }
  }, [dispatch, isVisible, news.length]);

  const nearestNews = news.length > 3 ? news.slice(0, 3) : news;

  return (
    <div ref={containerRef} className={cn(dashboardStyles.block, styles.block)}>
      <h2 className={cn(dashboardStyles.title, styles.title)} onClick={() => push(newsPage)}>
        Latest news
        <span className={cn(dashboardStyles.arrow, styles.arrow)} />
        <span className={cn(dashboardStyles.arrow, styles.arrow)} />
      </h2>
      <ul className={dashboardStyles.list}>
        {!error ? (
          !isLoading && news.length === 0 ? (
            <p className={styles.text}>There is no news yet</p>
          ) : (
            nearestNews.map(({ id, title, publishedAt }) => (
              <li className={cn(dashboardStyles.item, styles.item)} onClick={() => push(`${newsPage}/${id}`)} key={id}>
                <time dateTime={publishedAt}>
                  <span className={dashboardStyles.calendarIcon} />
                  {formatDate(publishedAt)}
                </time>
                <strong>{title}</strong>
              </li>
            ))
          )
        ) : (
          <Notification className={dashboardStyles.error} text={error} type='error' />
        )}
        {isLoading && <Loader className={dashboardStyles.loader} />}
      </ul>
    </div>
  );
};
