import { Scrollbar, Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import SwiperCore from 'swiper';
import cn from 'classnames';
import useElementOnScreen from 'hooks/useElementOnScreen';
import { useScreenWidth } from 'hooks/useScreenWidth';
import { useNews } from 'hooks/useNews';
import { getNews } from '@redux/features/newsSlice';
import { formatDate } from 'helpers/formatDate';
import { pathnames } from 'constants/pathnames';
import { Notification } from 'components/Notification';
import { ImageComponent } from 'components/Image';
import { Container } from 'components/Container';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { Link } from 'components/Link';
import arrowRight from 'assets/icons/arrow-right-background3_2.svg';
import arrowLeft from 'assets/icons/arrow-left-background3_2.svg';
import eye from 'assets/icons/eye.svg';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css';
import styles from 'pages/Main/blocks/LastNews/LastNews.scss';

SwiperCore.use([Navigation, Scrollbar]);

export const LastNews = () => {
  const { isLoading, error, news } = useSelector((state) => state.news);
  const { getCurrentPageNews } = useNews();
  const { newsPage } = pathnames;
  const dispatch = useDispatch();
  const width = useScreenWidth();
  const { push } = useHistory();

  const [containerRef, isVisible] = useElementOnScreen();

  const handleRedirect = (e, id) => {
    if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')) {
      push(`${newsPage}/${id}`);
    }
  };

  useEffect(() => {
    if (!error && isVisible && !news.some(({ pages }) => pages.some((page) => page === 'main'))) {
      dispatch(getNews({ getCurrentPageNews }));
    }
  }, [isVisible]);

  const lastNews = news.length > 8 ? news.slice(0, 8) : news;

  return (
    <section className={styles.block} ref={containerRef}>
      <Container>
        <h2 className={styles.title}>Latest news</h2>
        {news.length > 0 && (
          <div className={styles.navigationWrapper}>
            <Button className={cn(styles.btn, styles.prev)} id='btnPrev' ghostStyle small>
              <img src={arrowLeft} alt='arrow left' />
              Prev
            </Button>
            <Button className={cn(styles.btn, styles.next)} id='btnNext' ghostStyle small>
              Next
              <img src={arrowRight} alt='arrow right' />
            </Button>
          </div>
        )}
        {!error ? (
          isLoading ? (
            <Loader className={styles.loader} />
          ) : lastNews.length === 0 ? (
            <p className={styles.text}>There is no news yet</p>
          ) : (
            <>
              <div
                className={cn(styles.newsList, {
                  [styles.empty]: news.length === 0,
                })}
              >
                <Swiper
                  spaceBetween={width > 557 ? 24 : 8}
                  slidesPerView='auto'
                  scrollbar={{
                    dragClass: styles.thumb,
                    draggable: true,
                    dragSize: 240,
                    el: '#scrollbar',
                  }}
                  navigation={{ nextEl: '#btnNext', prevEl: '#btnPrev' }}
                >
                  {lastNews.map((article) => (
                    <SwiperSlide
                      className={styles.newsCard}
                      tabIndex={0}
                      onClick={(e) => handleRedirect(e, article.id)}
                      onKeyDown={(e) => handleRedirect(e, article.id)}
                      key={article.id}
                    >
                      <ImageComponent
                        className={styles.cover}
                        src={article.media?.[0].url || 'https://placehold.co/282'}
                        alt={article.media?.[0].alt || 'cover placeholder'}
                        placeholder={article.media?.[0].placeholder}
                        external={article.media}
                      />
                      <div className={styles.additionalInfo}>
                        <div className={styles.reactions}>
                          <img src={eye} alt='Views' />
                          {article.views}
                        </div>
                        <time dateTime={article.publicationDate}>{formatDate(article.publicationDate)}</time>
                      </div>
                      <div className={styles.newsTitleWrapper}>
                        <p className={styles.newsTitle}>{article.title}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                  <div id='scrollbar' className={styles.scrollbar} />
                </Swiper>
              </div>
              {lastNews.length > 0 && (
                <Link className={styles.moreBtn} content='See all news' path={newsPage} arrowRight />
              )}
            </>
          )
        ) : (
          <Notification text={error} type='error' />
        )}
      </Container>
    </section>
  );
};
