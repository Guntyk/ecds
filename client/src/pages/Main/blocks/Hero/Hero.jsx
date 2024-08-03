import { mockedAds } from 'constants/mockedAds';
import { Container } from 'components/Container';
import { Banners } from 'components/Banners';
import { Button } from 'components/Button';
import styles from 'pages/Main/blocks/Hero/Hero.scss';

export const Hero = () => (
  <section className={styles.block}>
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Unified Standards for a United Europe</h1>
          <Button buttonContent='Registration' />
        </div>
        <Banners banners={mockedAds} />
      </div>
    </Container>
  </section>
);
