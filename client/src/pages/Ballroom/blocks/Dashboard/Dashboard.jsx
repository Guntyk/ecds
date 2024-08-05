import { Container } from 'components/Container';
import { Calendar } from 'pages/Ballroom/blocks/Dashboard/Calendar';
import { Users } from 'pages/Ballroom/blocks/Dashboard/Users';
import { News } from 'pages/Ballroom/blocks/Dashboard/News';
import styles from 'pages/Ballroom/blocks/Dashboard/Dashboard.scss';

export const Dashboard = () => {
  return (
    <section className={styles.dashboard}>
      <Container>
        <div className={styles.blocksWrapper}>
          <Calendar />
          <Users />
          <News />
        </div>
      </Container>
    </section>
  );
};
