import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';
import { pathnames } from 'constants/pathnames';
import { Container } from 'components/Container';
import { Button } from 'components/Button';
import { Menu } from 'components/Menu';
import logo from 'assets/icons/logos/ecds.svg';
import styles from 'components/Header/Header.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const { mainPage, managementPage, documentsPage, contactsPage, logosPage, ballroomPage, calendarPage, newsPage } =
    pathnames;
  const darkHeaderPages = [
    managementPage,
    documentsPage,
    contactsPage,
    logosPage,
    ballroomPage,
    newsPage,
    calendarPage,
  ];
  const aboutUsPages = [managementPage, documentsPage, contactsPage, logosPage];

  const handleAboutUsLinkClick = (e) => {
    if (aboutUsPages.includes(pathname)) {
      e.preventDefault();
    }
  };

  const currentPathName = '/' + pathname.split('/')[1];

  return (
    <Container>
      <header className={cn(styles.header, { [styles.headerDark]: darkHeaderPages.includes(currentPathName) })}>
        <Link to={mainPage} className={styles.logo}>
          <img src={logo} alt='European Confederation of Dance Sports logo' />
          European Confederation of Dance Sports
        </Link>
        <nav>
          <ul className={styles.navigation}>
            <li>
              <NavLink
                className={cn(styles.navigationLink, { [styles.active]: aboutUsPages.includes(currentPathName) })}
                to={managementPage}
                onClick={handleAboutUsLinkClick}
                {...(aboutUsPages.includes(currentPathName) && { tabIndex: -1 })}
              >
                About us
              </NavLink>
            </li>
            <li>
              <Button className={styles.navigationLink} text='Menu' onClick={() => setIsMenuOpen(true)} noStyle />
            </li>
          </ul>
        </nav>
        <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </header>
    </Container>
  );
};
