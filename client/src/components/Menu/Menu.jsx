import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { menuLinks } from 'constants/links';
import arrow from 'assets/icons/arrow-right-menu.svg';
import cross from 'assets/icons/cross.svg';
import styles from 'components/Menu/Menu.scss';

export const Menu = ({ isOpen, setIsOpen }) => {
  return (
    <nav className={cn(styles.menu, { [styles.menuOpen]: isOpen })}>
      <div className={styles.header}>
        <span>Menu</span>
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)} {...(!isOpen ? { tabIndex: -1 } : {})}>
          <img src={cross} alt='cross' />
        </button>
      </div>
      <ul className={styles.links}>
        {menuLinks.map(({ id, title, path }) => (
          <li key={id}>
            <NavLink
              className={styles.link}
              to={path}
              onClick={() => setIsOpen(false)}
              {...(!isOpen ? { tabIndex: -1 } : {})}
            >
              {title}
              <img src={arrow} alt='arrow right' />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
