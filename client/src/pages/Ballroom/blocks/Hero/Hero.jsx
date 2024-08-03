import { mockedAds } from 'constants/mockedAds';
import { Container } from 'components/Container';
import { Banners } from 'components/Banners';
import styles from 'pages/Ballroom/blocks/Hero/Hero.scss';

export const Hero = () => {
  return (
    <section className={styles.block}>
      <Container>
        <div className={styles.wrapper}>
          <Banners banners={mockedAds} navigationClassName={styles.bannersNavigation} />
        </div>
      </Container>
    </section>
  );
};
