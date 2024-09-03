import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import cn from "classnames";
import { useScreenWidth } from "hooks/useScreenWidth";
import { pathnames } from "constants/pathnames";
import { menuLinks } from "constants/links";
import arrow from "assets/icons/arrow-right-menu.svg";
import cross from "assets/icons/cross.svg";
import styles from "components/Menu/Menu.scss";

export const Menu = ({ isOpen, setIsOpen }) => {
  const { mainPage, managementPage } = pathnames;
  const screenWidth = useScreenWidth();
  const { pathname } = useLocation();
  const menuRef = useRef(null);

  const currentBasePathname = useMemo(() => {
    const basePath = pathname.split("/")[1] || "";
    return basePath.length > 0 ? `/${basePath}` : mainPage;
  }, [pathname, mainPage]);

  const currentLinks = useMemo(
    () => menuLinks[currentBasePathname] || menuLinks[mainPage],
    [currentBasePathname, mainPage]
  );

  const generateLinkPath = (path) => {
    if (currentBasePathname === mainPage) {
      return path;
    }

    const isSubPageLink = Object.entries(menuLinks)
      .filter(([key]) => key !== mainPage)
      .some(
        ([key, links]) =>
          key === currentBasePathname &&
          links.some((link) => link.path === path)
      );

    return isSubPageLink ? `${currentBasePathname}${path}` : path;
  };

  useEffect(() => {
    if (currentLinks && screenWidth <= 557) {
      currentLinks.unshift({ id: 7, title: "About us", path: managementPage });
    }
  }, [currentLinks]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      <nav
        ref={menuRef}
        className={cn(styles.menu, { [styles.menuOpen]: isOpen })}
        role="navigation"
        aria-label="Main menu"
      >
        <div className={styles.header}>
          <span>Menu</span>
          <button
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            tabIndex={isOpen ? 0 : -1}
          >
            <img src={cross} alt="Close menu" />
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
                aria-current={pathname.includes(path) ? "page" : undefined}
                tabIndex={isOpen ? 0 : -1}
              >
                {title}
                <img src={arrow} alt="Navigate" />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.background} />
    </>
  );
};
