import { Scrollbar, Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import SwiperCore from 'swiper';
import cn from 'classnames';
import * as newsActions from '../../../../redux/features/newsSlice';
import { formatDate } from 'helpers/formatDate';
import { pathnames } from 'constants/pathnames';
import { Notification } from 'components/Notification';
import { ImageComponent } from 'components/Image';
import { Container } from 'components/Container';
import { Button } from 'components/Button';
import { Link } from 'components/Link';
import useElementOnScreen from 'hooks/useElementOnScreen';
import arrowRight from 'assets/icons/arrow-right-background3_2.svg';
import arrowLeft from 'assets/icons/arrow-left-background3_2.svg';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css';
import styles from 'pages/Main/blocks/LastNews/LastNews.scss';

SwiperCore.use([Navigation, Scrollbar]);

export const LastNews = () => {
  const { isLoading, error, news } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const { newsPage } = pathnames;
  const { push } = useHistory();

  const [containerRef, isVisible] = useElementOnScreen();

  useEffect(() => {
    if (isVisible && !news.length) {
      dispatch(newsActions.getNews());
    }
  }, [dispatch, isVisible, news.length]);

  return (
    <section className={styles.block} ref={containerRef}>
      <Container>
        <h2 className={styles.title}>Latest news</h2>
        {news.length > 3 && (
          <div className={styles.navigationWrapper}>
            <Button
              id='btnPrev'
              buttonContent='Prev'
              iconData={{ alt: 'arrow left', src: arrowLeft, side: 'left' }}
              lightStyle
            />
            <Button
              id='btnNext'
              buttonContent='Next'
              iconData={{ alt: 'arrow right', src: arrowRight, side: 'right' }}
              lightStyle
            />
          </div>
        )}
        {!error ? (
          !isLoading && news.length === 0 ? (
            <p className={styles.text}>There is no news yet</p>
          ) : (
            <>
              <div className={cn(styles.newsList, { [styles.empty]: news.length === 0 })}>
                <Swiper
                  spaceBetween={24}
                  slidesPerView='auto'
                  scrollbar={{ dragClass: styles.thumb, draggable: true, dragSize: 240, el: '#scrollbar' }}
                  navigation={{ nextEl: '#btnNext', prevEl: '#btnPrev' }}
                >
                  {news.map(({ id, title, publishedAt, media }) => (
                    <SwiperSlide className={styles.newsCard} onClick={() => push(`${newsPage}/${id}`)} key={id}>
                      <ImageComponent
                        className={styles.cover}
                        src={media?.[0].url || 'https://placehold.co/282'}
                        alt={media?.[0].alt || 'cover placeholder'}
                        placeholder={media?.[0].placeholder}
                        external={media}
                      />
                      <p className={styles.publicationDate}>{formatDate(publishedAt)}</p>
                      <div className={styles.newsTitleWrapper}>
                        <p className={styles.newsTitle}>{title}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                  <div id='scrollbar' className={styles.scrollbar} />
                </Swiper>
              </div>
              {news.length > 0 && <Link className={styles.moreBtn} content='See all news' path={newsPage} arrowRight />}
            </>
          )
        ) : (
          <Notification text={error} type='error' />
        )}
        {isLoading && <p className={styles.text}>Loading...</p>}
      </Container>
    </section>
  );
};
