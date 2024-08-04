import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useElementOnScreen from 'hooks/useElementOnScreen';
import * as bannersActions from '../../../../redux/features/bannersSlice';
import { ErrorMessage } from 'components/ErrorMessage';
import { Container } from 'components/Container';
import { Banners } from 'components/Banners';
import { Button } from 'components/Button';
import styles from 'pages/Main/blocks/Hero/Hero.scss';

export const Hero = () => {
  const { isLoading, error, banners } = useSelector((state) => state.banners);
  const dispatch = useDispatch();

  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  });

  useEffect(() => {
    if (isVisible && !banners.length) {
      dispatch(bannersActions.getBanners());
    }
  }, [dispatch, isVisible, banners.length]);

  return (
    <section className={styles.block}>
      <Container>
        <div ref={containerRef} className={styles.wrapper}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>Unified Standards for a United Europe</h1>
            <Button buttonContent='Registration' />
          </div>
          {!error ? !isLoading && banners.length > 0 && <Banners banners={banners} /> : <ErrorMessage error={error} />}
          {isLoading && <p className={styles.text}>Loading...</p>}
        </div>
      </Container>
    </section>
  );
};
