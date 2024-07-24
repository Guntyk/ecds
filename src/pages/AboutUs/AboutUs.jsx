import { useLocation, Redirect } from 'react-router-dom';
import { aboutUsLinks } from 'constants/aboutUsLinks';
import { pathnames } from 'constants/pathnames';
import { Container } from 'components/Container';
import { Link } from 'components/Link';
import { Contacts } from 'pages/AboutUs/Contacts';
import styles from 'pages/AboutUs/AboutUs.scss';

export const AboutUs = () => {
  const { pathname } = useLocation();
  const { managementPage, documentsPage, contactsPage, logosPage } = pathnames;

  const renderPage = () => {
    switch (pathname) {
      case managementPage:
        return 'Management';
      case documentsPage:
        return 'Documents';
      case contactsPage:
        return <Contacts />;
      case logosPage:
        return 'Logos';
      default:
        return <Redirect to='/not-found' />;
    }
  };

  return (
    <Container>
      <div className={styles.page}>
        <h1 className={styles.title}>About us</h1>
        <div className={styles.pageContent}>
          <section className={styles.navigation}>
            <nav>
              <ul>
                {aboutUsLinks.map(({ id, title, path }) => (
                  <li key={id}>
                    <Link text={title} path={path} active={pathname === path} buttonStyle />
                  </li>
                ))}
              </ul>
            </nav>
          </section>
          <section className={styles.content}>{renderPage()}</section>
        </div>
      </div>
    </Container>
  );
};
