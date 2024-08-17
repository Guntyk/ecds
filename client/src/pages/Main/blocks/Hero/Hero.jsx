import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useElementOnScreen from 'hooks/useElementOnScreen';
import { getBanners } from '@redux/features/bannersSlice';
import { Notification } from 'components/Notification';
import { Container } from 'components/Container';
import { Banners } from 'components/Banners';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import styles from 'pages/Main/blocks/Hero/Hero.scss';

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
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>Unified Standards for a United Europe</h1>
            <Button text='Registration' onClick={() => window.open(process.env.REACT_APP_EPHAN_URL)} normalStyle />
          </div>
          {!error ? (
            isLoading ? (
              <Loader />
            ) : (
              banners.length > 0 && <Banners banners={banners} />
            )
          ) : (
            <Notification className={styles.error} text={error} type='error' />
          )}
        </div>
      </Container>
    </section>
  );
};
