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
import { ErrorMessage } from 'components/ErrorMessage';
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

  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  });

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
                      src={media[0]?.url || 'https://placehold.co/282'}
                      alt={media[0]?.alt || 'cover placeholder'}
                      placeholder={media[0]?.placeholder}
                      external
                    />
                    <p className={styles.publicationDate}>{formatDate(publishedAt)}</p>
                    <p className={styles.newsTitle}>{title}</p>
                  </SwiperSlide>
                ))}
                <div id='scrollbar' className={styles.scrollbar} />
              </Swiper>
            </div>
          )
        ) : (
          <ErrorMessage error={error} />
        )}
        {isLoading && <p className={styles.text}>Loading...</p>}
        <Link className={styles.moreBtn} content='See all news' path={newsPage} arrowRight />
      </Container>
    </section>
  );
};
