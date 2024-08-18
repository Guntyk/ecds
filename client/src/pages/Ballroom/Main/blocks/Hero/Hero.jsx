import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useElementOnScreen from 'hooks/useElementOnScreen';
import { getBanners } from '@redux/features/bannersSlice';
import { Notification } from 'components/Notification';
import { Container } from 'components/Container';
import { Banners } from 'components/Banners';
import { Loader } from 'components/Loader';
import styles from 'pages/Ballroom/Main/blocks/Hero/Hero.scss';

export const Hero = () => {
  const { isLoading, error, banners } = useSelector((state) => state.banners);
  const dispatch = useDispatch();

  const [containerRef, isVisible] = useElementOnScreen();

  useEffect(() => {
    if (!error && isVisible && !banners.length) {
      dispatch(getBanners());
    }
  }, [isVisible, banners.length]);

  return (
    <section className={styles.block}>
      <Container>
        <div ref={containerRef} className={styles.wrapper}>
          {!error ? (
            isLoading ? (
              <Loader className={styles.loader} />
            ) : (
              banners.length > 0 && (
                <Banners
                  banners={banners}
                  sliderClassName={styles.bannersSlider}
                  navigationClassName={styles.bannersNavigation}
                />
              )
            )
          ) : (
            <Notification text={error} type='error' />
          )}
        </div>
      </Container>
    </section>
  );
};
