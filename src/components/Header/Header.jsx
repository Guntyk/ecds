import cn from 'classnames';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { pathnames } from 'constants/pathnames';
import { Button } from 'components/Button';
import logo from 'assets/icons/logos/ecds.svg';
import styles from 'components/Header/Header.scss';

export const Header = () => {
  const { homePage, aboutUsPage } = pathnames;
  const { pathname } = useLocation();
  const darkHeaderPages = [homePage];

  const navigationLinks = [{ id: 1, name: 'About us', pathname: aboutUsPage }];

  return (
    <header className={cn(styles.header, { [styles.headerDark]: darkHeaderPages.includes(pathname) })}>
      <Link to={homePage} className={styles.logo}>
        <img src={logo} alt='European Confederation of Dance Sports logo' />
        European Confederation of Dance Sports
      </Link>
      <nav>
        <ul className={styles.navigation}>
          {navigationLinks.map(({ id, name, pathname }) => (
            <li key={id}>
              <NavLink className={styles.navigationLink} to={pathname}>
                {name}
              </NavLink>
            </li>
          ))}
          <li>
            <Button buttonContent='Menu' textStyle />
          </li>
        </ul>
      </nav>
    </header>
  );
};
