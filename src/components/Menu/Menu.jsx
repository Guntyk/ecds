import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { menuLinks } from 'constants/menuLinks';
import arrow from 'assets/icons/arrow-right-menu.svg';
import cross from 'assets/icons/cross.svg';
import styles from 'components/Menu/Menu.scss';

export const Menu = ({ isOpen, setIsOpen }) => {
  return (
    <nav className={cn(styles.menu, { [styles.menuOpen]: isOpen })}>
      <div className={styles.header}>
        <span>Menu</span>
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
          <img src={cross} alt='cross' />
        </button>
      </div>
      <ul className={styles.links}>
        {menuLinks.map(({ id, name, link }) => (
          <li key={id}>
            <NavLink className={styles.link} to={link}>
              {name}
              <img src={arrow} alt='arrow right' />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
