import { pathnames } from 'constants/pathnames';
import { Container } from 'components/Container';
import { Link } from 'components/Link';
import arrow from 'assets/icons/arrow-left-white.svg';
import styles from 'pages/Services/NotFound/NotFound.scss';

export const NotFound = () => {
  const { mainPage } = pathnames;

  return (
    <article className={styles.page}>
      <Container>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Oops...</h1>
          <p className={styles.subtitle}>Page not found</p>
          <p className={styles.text}>
            This Page doesn’t exist or was removed!
            <br />
            We suggest you back to home.
          </p>
          <Link
            className={styles.btn}
            content='back to home'
            path={mainPage}
            arrowSrc={arrow}
            arrowLeft
            pinkButtonStyle
          />
        </div>
      </Container>
    </article>
  );
};
