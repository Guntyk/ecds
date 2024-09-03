import { Container } from 'components/Container';
import { Button } from 'components/Button';
import ephanScreen from 'assets/images/ephan-app-phone.svg';
import ephanPhone from 'assets/images/ephan-mobile.svg';
import arrowRight from 'assets/icons/arrow-right-long.svg';
import styles from 'pages/Main/blocks/Platform/Platform.scss';

export const Platform = () => {
  return (
    <section className={styles.block}>
      <div className={styles.wrapper}>
        <Container maxWidth={980}>
          <div className={styles.textInfo}>
            <h2 className={styles.title}>Platform</h2>
            <p className={styles.text}>
              <strong>e-phan</strong> is an online ECDS platform.
            </p>
            <p className={styles.text}>
              Become a part of the European dance community regardless of your skill level, place of residence and
              membership of organizations.*
            </p>
            <Button
              text='Registration'
              className={styles.registrationBtn}
              onClick={() => window.open(process.env.REACT_APP_EPHAN_URL)}
              normalStyle
            />
          </div>
          <p className={styles.subtext}>
            * If you are not a member of a national organization, there will be a fee to register on the platform.
          </p>
          <img className={styles.ephanScreen} src={ephanScreen} alt='screenshot of e-phan platform' />
          <img className={styles.ephanPhone} src={ephanPhone} alt='screenshot of e-phan platform' />
        </Container>
      </div>
      {/* <div className={styles.statsWrapper}>
        <Container maxWidth={980}>
          <div className={styles.stats}>
            <p className={styles.statisticsValue}>
              400<span>users</span>
            </p>
            <p className={styles.statisticsValue}>
              8<span>countries</span>
            </p>
            <div className={styles.title}>
              <img src={arrowRight} alt='white arrow to the right' />
              <h3 className={styles.h3}>Already joined</h3>
            </div>
          </div>
        </Container>
      </div> */}
    </section>
  );
};
