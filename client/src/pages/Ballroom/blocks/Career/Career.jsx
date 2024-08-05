import { pathnames } from 'constants/pathnames';
import { Container } from 'components/Container';
import { Arrow } from 'components/Arrow';
import { Link } from 'components/Link';
import styles from 'pages/Ballroom/blocks/Career/Career.scss';

export const Career = () => {
  const { ballroomPage } = pathnames;
  const links = [
    { id: 1, title: 'Dancers', path: ballroomPage },
    { id: 2, title: 'Coaches', path: ballroomPage },
    { id: 3, title: 'Judges', path: ballroomPage },
  ];

  return (
    <section className={styles.block}>
      <Container>
        <h2 className={styles.title}>Game all the way</h2>
        <p className={styles.subtitle}>Scheme of career growth according to our standards</p>
        <div className={styles.conditions}>
          <p className={styles.conditionsTitle}>
            Review the conditions for your achievements
            <Arrow className={styles.arrowWrapper} angleClassName={styles.arrow} noStyle />
          </p>
          {links.map(({ id, title, path }) => (
            <Link className={styles.link} path={path} content={title} key={id} noStyle />
          ))}
        </div>
      </Container>
    </section>
  );
};
