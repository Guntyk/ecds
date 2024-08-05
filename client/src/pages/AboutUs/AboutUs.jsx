import { useLocation, Redirect } from 'react-router-dom';
import { aboutUsLinks } from 'constants/links';
import { pathnames } from 'constants/pathnames';
import { Container } from 'components/Container';
import { Link } from 'components/Link';
import { Management } from 'pages/AboutUs/Management';
import { Documents } from 'pages/AboutUs/Documents';
import { Contacts } from 'pages/AboutUs/Contacts';
import { Logos } from 'pages/AboutUs/Logos';
import styles from 'pages/AboutUs/AboutUs.scss';

export const AboutUs = () => {
  const { pathname } = useLocation();
  const { managementPage, documentsPage, contactsPage, logosPage, notFoundPage } = pathnames;

  const renderPage = () => {
    switch (pathname) {
      case managementPage:
        return <Management />;
      case documentsPage:
        return <Documents />;
      case contactsPage:
        return <Contacts />;
      case logosPage:
        return <Logos />;
      default:
        return <Redirect to={notFoundPage} />;
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
                    <Link content={title} path={path} active={pathname === path} buttonStyle />
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
