import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { pathnames } from 'constants/pathnames';
import { Container } from 'components/Container';
import { Button } from 'components/Button';
import { Menu } from 'components/Menu';
import logoSmall from 'assets/icons/logos/ecds-compressed.svg';
import logo from 'assets/icons/logos/ecds.svg';
import menu from 'assets/icons/menu.svg';
import styles from 'components/Header/Header.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const {
    mainPage,
    managementPage,
    documentsPage,
    contactsPage,
    logosPage,
    ballroomPage,
    calendarPage,
    newsPage,
    membersPage,
  } = pathnames;
  const darkHeaderPages = [
    managementPage,
    documentsPage,
    contactsPage,
    logosPage,
    ballroomPage,
    newsPage,
    calendarPage,
    membersPage,
  ];
  const aboutUsPages = [managementPage, documentsPage, contactsPage, logosPage];

  const handleAboutUsLinkClick = (e) => {
    if (aboutUsPages.includes(pathname)) {
      e.preventDefault();
    }
  };

  const { width } = useWindowDimensions();

  const currentPathName = '/' + pathname.split('/')[1];

  return (
    <header className={styles.headerWrapper}>
      <Container>
        <div className={cn(styles.header, { [styles.headerDark]: darkHeaderPages.includes(currentPathName) })}>
          <Link to={mainPage} className={styles.logo}>
            <img src={width > 557 ? logo : logoSmall} alt='European Confederation of Dance Sports logo' />
            {width > 557 && 'European Confederation of Dance Sports'}
          </Link>
          <nav>
            <ul className={styles.navigation}>
              {width > 557 && (
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
              )}
              <li>
                <Button
                  className={styles.navigationLink}
                  text={width > 557 ? 'Menu' : <img src={menu} alt='Menu' />}
                  onClick={() => setIsMenuOpen(true)}
                  noStyle
                />
              </li>
            </ul>
          </nav>
          <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        </div>
      </Container>
    </header>
  );
};
