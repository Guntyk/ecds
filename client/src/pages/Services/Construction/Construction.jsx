import { pathnames } from 'constants/pathnames';
import { Link } from 'components/Link';
import arrow from 'assets/icons/arrow-left-white.svg';
import styles from 'pages/Services/Construction/Construction.scss';

export const Construction = ({ website }) => {
  const { mainPage } = pathnames;

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{website ? 'Website' : 'This page'}</h1>
      <p className={styles.subtitle}>Under construction</p>
      <Link content='Back to home' path={mainPage} arrowSrc={arrow} arrowLeft pinkButtonStyle />
    </section>
  );
};
