import { NavLink, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import cn from 'classnames';
import { pathnames } from 'constants/pathnames';
import { menuLinks } from 'constants/links';
import arrow from 'assets/icons/arrow-right-menu.svg';
import cross from 'assets/icons/cross.svg';
import styles from 'components/Menu/Menu.scss';

export const Menu = ({ isOpen, setIsOpen }) => {
  const { mainPage } = pathnames;
  const { pathname } = useLocation();

  const currentBasePathname = useMemo(() => {
    const basePath = pathname.split('/')[1] || '';
    return basePath.length > 0 ? `/${basePath}` : mainPage;
  }, [pathname]);

  const currentLinks = useMemo(() => menuLinks[currentBasePathname] || menuLinks[mainPage], [currentBasePathname]);

  const generateLinkPath = (path) => {
    if (currentBasePathname === mainPage) {
      return path;
    }

    const isSubPageLink = Object.entries(menuLinks)
      .filter(([key]) => key !== mainPage)
      .some(([key, links]) => key === currentBasePathname && links.some((link) => link.path === path));

    return isSubPageLink ? `${currentBasePathname}${path}` : path;
  };

  return (
    <nav
      className={cn(styles.menu, { [styles.menuOpen]: isOpen })}
      onMouseLeave={() => setIsOpen(false)}
      role='navigation'
      aria-label='Main menu'
    >
      <div className={styles.header}>
        <span>Menu</span>
        <button
          className={styles.closeBtn}
          onClick={() => setIsOpen(false)}
          aria-label='Close menu'
          tabIndex={isOpen ? 0 : -1}
        >
          <img src={cross} alt='Close menu' />
        </button>
      </div>
      <ul className={styles.links}>
        {currentLinks.map(({ id, title, path }) => (
          <li key={id}>
            <NavLink
              className={styles.link}
              to={generateLinkPath(path)}
              activeClassName={styles.active}
              exact={generateLinkPath(path) === pathname}
              onClick={() => setIsOpen(false)}
              aria-current={pathname.includes(path) ? 'page' : undefined}
              tabIndex={isOpen ? 0 : -1}
            >
              {title}
              <img src={arrow} alt='Navigate' />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
