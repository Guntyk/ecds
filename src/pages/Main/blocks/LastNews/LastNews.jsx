import { Scrollbar, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useHistory } from 'react-router-dom';
import SwiperCore from 'swiper';
import { convertDateFormat } from 'helpers/convertDate';
import { mockedNews } from 'constants/mockedData';
import { pathnames } from 'constants/pathnames';
import { Container } from 'components/Container';
import { Button } from 'components/Button';
import { Link } from 'components/Link';
import arrowRight from 'assets/icons/arrow-right-background3_2.svg';
import arrowLeft from 'assets/icons/arrow-left-background3_2.svg';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css';
import styles from 'pages/Main/blocks/LastNews/LastNews.scss';

SwiperCore.use([Navigation, Scrollbar]);

export const LastNews = () => {
  const { newsPage } = pathnames;
  const { push } = useHistory();

  return (
    <section className={styles.block}>
      <Container>
        <h2 className={styles.title}>Latest News</h2>
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
        <div className={styles.newsList}>
          <Swiper
            spaceBetween={24}
            slidesPerView='auto'
            scrollbar={{ dragClass: styles.thumb, draggable: true, dragSize: 240, el: '#scrollbar' }}
            navigation={{ nextEl: '#btnNext', prevEl: '#btnPrev' }}
          >
            {mockedNews.map(({ id, title, publicationDate, cover }) => (
              <SwiperSlide className={styles.newsCard} onClick={() => push(`${newsPage}/${id}`)} key={id}>
                <img
                  className={styles.cover}
                  src={cover?.src || 'https://placehold.co/282'}
                  alt={cover?.alt || 'cover placeholder'}
                />
                <p className={styles.publicationDate}>{convertDateFormat(publicationDate)}</p>
                <p className={styles.newsTitle}>{title}</p>
              </SwiperSlide>
            ))}
            <div id='scrollbar' className={styles.scrollbar} />
          </Swiper>
        </div>
        <Link className={styles.moreBtn} text='See all news' path={newsPage} arrowRight />
      </Container>
    </section>
  );
};
