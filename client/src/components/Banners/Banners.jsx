import { EffectFade, Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import cn from "classnames";
import { sliderSettings } from "constants/bannersSliderSettings";
import { ImageComponent } from "components/Image";
import { Arrow } from "components/Arrow";
import { Link } from "components/Link";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import styles from "components/Banners/Banners.scss";

SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

export const Banners = ({ banners, sliderClassName, navigationClassName }) => (
  <div className={cn(styles.sliderWrapper, sliderClassName)}>
    <Swiper className={styles.bannersSlider} {...sliderSettings}>
      {banners.map(
        ({ id, link, image: { alternativeText, url, placeholder } }) => (
          <SwiperSlide className={styles.bannerSlide} key={id}>
            <Link
              className={styles.banner}
              content={
                <ImageComponent
                  alt={alternativeText}
                  src={url}
                  placeholder={placeholder}
                  external
                />
              }
              path={link}
              external
              noStyle
            />
          </SwiperSlide>
        )
      )}
    </Swiper>
    {banners.length > 1 && (
      <div className={cn(styles.navigation, navigationClassName)}>
        <Arrow className={styles.arrow} id="prev" title="Previous banner" />
        <div id="pagination" className={styles.pagination}></div>
        <Arrow className={styles.arrow} id="next" title="Next banner" />
      </div>
    )}
  </div>
);
