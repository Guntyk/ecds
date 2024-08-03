import { EffectFade, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { mockedAds } from 'constants/mockedAds';
import { Container } from 'components/Container';
import { Button } from 'components/Button';
import { Arrow } from 'components/Arrow';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import styles from 'pages/Main/blocks/Hero/Hero.scss';

SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

export const Hero = () => {
  const pagination = {
    bulletActiveClass: styles.bulletActive,
    bulletClass: styles.bullet,
    el: '#pagination',
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + '</span>';
    },
  };

  return (
    <section className={styles.block}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>Unified Standards for a United Europe</h1>
            <Button buttonContent='Registration' />
          </div>
          <div className={styles.sliderWrapper}>
            <Swiper
              className={styles.bannersSlider}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
              }}
              effect={'fade'}
              pagination={pagination}
              navigation={{ nextEl: '#next', prevEl: '#prev' }}
            >
              {mockedAds.map((Component, index) => (
                <SwiperSlide key={index}>
                  <Component />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={styles.navigation}>
              <Arrow id='prev' title='Previous banner' />
              <div id='pagination' className={styles.pagination}></div>
              <Arrow id='next' title='Next banner' />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
