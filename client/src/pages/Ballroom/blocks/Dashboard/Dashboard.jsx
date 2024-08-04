import { Container } from 'components/Container';
import { Calendar } from 'pages/Ballroom/blocks/Dashboard/Calendar';
import styles from 'pages/Ballroom/blocks/Dashboard/Dashboard.scss';

export const Dashboard = () => {
  return (
    <section className={styles.dashboard}>
      <Container>
        <div className={styles.blocksWrapper}>
          <Calendar />
        </div>
      </Container>
    </section>
  );
};
