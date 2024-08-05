import { Container } from 'components/Container';
import { Calendar } from 'pages/Ballroom/blocks/Dashboard/Calendar';
import { News } from 'pages/Ballroom/blocks/Dashboard/News';
import styles from 'pages/Ballroom/blocks/Dashboard/Dashboard.scss';

export const Dashboard = () => {
  return (
    <section className={styles.dashboard}>
      <Container>
        <div className={styles.blocksWrapper}>
          <Calendar />
          <News />
        </div>
      </Container>
    </section>
  );
};
