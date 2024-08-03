import { EffectFade, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import cn from 'classnames';
import { sliderSettings } from 'constants/bannersSliderSettings';
import { Arrow } from 'components/Arrow';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import styles from 'components/Banners/Banners.scss';

SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

export const Banners = ({ banners, navigationClassName }) => (
  <div className={styles.sliderWrapper}>
    <Swiper className={styles.bannersSlider} {...sliderSettings}>
      {banners.map((Component, index) => (
        <SwiperSlide key={index}>
          <Component />
        </SwiperSlide>
      ))}
    </Swiper>
    {banners.length > 1 && (
      <div className={cn(styles.navigation, navigationClassName)}>
        <Arrow id='prev' title='Previous banner' />
        <div id='pagination' className={styles.pagination}></div>
        <Arrow id='next' title='Next banner' />
      </div>
    )}
  </div>
);
