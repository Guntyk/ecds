import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';
import { useScreenWidth } from 'hooks/useScreenWidth';
import { pathnames } from 'constants/pathnames';
import { Container } from 'components/Container';
import { Button } from 'components/Button';
import { Menu } from 'components/Menu';
import logoSmallDark from 'assets/icons/logos/ecds-compressed-dark.svg';
import logoSmall from 'assets/icons/logos/ecds-compressed.svg';
import logo from 'assets/icons/logos/ecds.svg';
import styles from 'components/Header/Header.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const screenWidth = useScreenWidth();
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

  const currentPathName = '/' + pathname.split('/')[1];
  const isPageDark = darkHeaderPages.includes(currentPathName);

  return (
    <>
      <header className={styles.headerWrapper}>
        <Container>
          <div className={cn(styles.header, { [styles.headerDark]: isPageDark })}>
            <Link to={mainPage} className={styles.logo}>
              <img
                src={screenWidth > 557 ? logo : isPageDark ? logoSmallDark : logoSmall}
                alt='European Confederation of Dance Sports logo'
              />
              {screenWidth > 557 && 'European Confederation of Dance Sports'}
            </Link>
            <nav>
              <ul className={styles.navigation}>
                {screenWidth > 557 && (
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
                    text={screenWidth > 557 ? 'Menu' : <div className={styles.menuIcon} />}
                    onClick={() => setIsMenuOpen(true)}
                    noStyle
                  />
                </li>
              </ul>
            </nav>
          </div>
          {screenWidth > 557 && <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />}
        </Container>
      </header>
      {screenWidth <= 557 && <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />}
    </>
  );
};
