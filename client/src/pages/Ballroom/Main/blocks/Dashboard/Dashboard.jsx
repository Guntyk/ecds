import { Container } from "components/Container";
import { Certification } from "pages/Ballroom/Main/blocks/Dashboard/Certification";
import { Calendar } from "pages/Ballroom/Main/blocks/Dashboard/Calendar";
import { Users } from "pages/Ballroom/Main/blocks/Dashboard/Users";
import { News } from "pages/Ballroom/Main/blocks/Dashboard/News";
import styles from "pages/Ballroom/Main/blocks/Dashboard/Dashboard.scss";

export const Dashboard = () => {
  return (
    <section className={styles.dashboard}>
      <Container>
        <div className={styles.blocksWrapper}>
          <Calendar />
          <Users />
          <Certification />
          <News />
        </div>
      </Container>
    </section>
  );
};
