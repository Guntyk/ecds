import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useElementOnScreen from 'hooks/useElementOnScreen';
import { useScreenWidth } from 'hooks/useScreenWidth';
import { getBanners } from '@redux/features/bannersSlice';
import { Container } from 'components/Container';
import { Banners } from 'components/Banners';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import styles from 'pages/Main/blocks/Hero/Hero.scss';

export const Hero = () => {
  const { isLoading, error, banners } = useSelector((state) => state.banners);
  const [containerRef, isVisible] = useElementOnScreen();
  const screenWidth = useScreenWidth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (screenWidth > 557 && !error && isVisible && !banners.length) {
      dispatch(getBanners());
    }
  }, [isVisible, banners.length]);

  return (
    <section className={styles.block}>
      <Container>
        <div ref={containerRef} className={styles.wrapper}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>Unified Standards for a United Europe</h1>
            <Button text='Registration' onClick={() => window.open(process.env.REACT_APP_EPHAN_URL)} normalStyle />
          </div>
          {isLoading ? (
            <Loader className={styles.loader} />
          ) : (
            banners.length > 0 && <Banners sliderClassName={styles.banners} banners={banners} />
          )}
        </div>
      </Container>
    </section>
  );
};
