import cn from 'classnames';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { pathnames } from 'constants/pathnames';
import { Container } from 'components/Container';
import { Button } from 'components/Button';
import logo from 'assets/icons/logos/ecds.svg';
import styles from 'components/Header/Header.scss';

export const Header = () => {
  const { pathname } = useLocation();

  const { mainPage, managementPage, documentsPage, contactsPage, logosPage } = pathnames;
  const aboutUsPages = [managementPage, documentsPage, contactsPage, logosPage];
  const darkHeaderPages = [mainPage];

  const handleAboutUsLinkClick = (e) => {
    if (aboutUsPages.includes(pathname)) {
      e.preventDefault();
    }
  };

  return (
    <Container>
      <header className={cn(styles.header, { [styles.headerDark]: darkHeaderPages.includes(pathname) })}>
        <Link to={mainPage} className={styles.logo}>
          <img src={logo} alt='European Confederation of Dance Sports logo' />
          European Confederation of Dance Sports
        </Link>
        <nav>
          <ul className={styles.navigation}>
            <li>
              <NavLink className={styles.navigationLink} to={managementPage} onClick={handleAboutUsLinkClick}>
                About us
              </NavLink>
            </li>
            <li>
              <Button className={styles.navigationLink} buttonContent='Menu' headerStyle />
            </li>
          </ul>
        </nav>
      </header>
    </Container>
  );
};
