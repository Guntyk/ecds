import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import cn from 'classnames';
import { getBanners } from '@redux/features/bannersSlice';
import { Container } from 'components/Container';
import { Banners } from 'components/Banners';
import { Loader } from 'components/Loader';
import styles from 'pages/Main/blocks/Banners/Banners.scss';

export const BannersShowcase = () => {
  const { isLoading, error, banners } = useSelector((state) => state.banners);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error && !banners.length) {
      dispatch(getBanners());
    }
  }, [banners.length]);

  return (
    <Container className={cn(styles.block, { [styles.blockShown]: banners.length > 0 })}>
      {isLoading ? (
        <Loader className={styles.loader} />
      ) : (
        banners.length > 0 && <Banners sliderClassName={styles.slider} banners={banners} />
      )}
    </Container>
  );
};
