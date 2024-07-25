import { useState } from 'react';
import cn from 'classnames';
import { Arrow } from 'components/Arrow';
import { Link } from 'components/Link';
import styles from 'components/Dropdown/Logo/Logo.scss';

export const LogoDropdown = ({ logo: { name, paths, alt } }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <div className={cn(styles.dropdownBtn, { [styles.open]: isOpen })}>
        <span>{name}</span>
        <Arrow isOpen={isOpen} logoStyle onClick={toggleDropdown} />
      </div>
      <div className={cn(styles.content, { [styles.open]: isOpen })}>
        <ul className={styles.contentInner}>
          <li className={styles.logo}>
            <div className={styles.logoWrapper}>
              <img src={paths?.svg || paths?.png || paths?.jpg} alt={alt} />
            </div>
            <div className={styles.buttonsWrapper}>
              {Object.entries(paths).map(([key, value]) => (
                <Link text={`Download in ${key}`} path={value} download />
              ))}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
