import { Scrollbar, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { convertDateFormat } from 'helpers/convertDate';
import { mockedNews } from 'constants/mockedData';
import { Container } from 'components/Container';
import { Button } from 'components/Button';
import coverPlaceholder from 'assets/images/cover-placeholder.jpg';
import arrowRightPurple from 'assets/icons/arrow-right-purple.svg';
import arrowRight from 'assets/icons/arrow-right-background3_2.svg';
import arrowLeft from 'assets/icons/arrow-left-background3_2.svg';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css';
import styles from 'pages/Main/blocks/LastNews/LastNews.scss';

SwiperCore.use([Navigation, Scrollbar]);

export const LastNews = () => {
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
              <SwiperSlide className={styles.newsCard} key={id}>
                <img
                  className={styles.cover}
                  src={cover?.src || coverPlaceholder}
                  alt={cover?.alt || 'cover placeholder'}
                />
                <p className={styles.publicationDate}>{convertDateFormat(publicationDate)}</p>
                <p className={styles.newsTitle}>{title}</p>
              </SwiperSlide>
            ))}
            <div id='scrollbar' className={styles.scrollbar} />
          </Swiper>
        </div>
        <Button
          className={styles.moreBtn}
          buttonContent='See all news'
          iconData={{ alt: 'arrow right', src: arrowRightPurple, side: 'right' }}
          textStyle
        />
      </Container>
    </section>
  );
};
