import { useState } from 'react';
import cn from 'classnames';
import { Arrow } from 'components/Arrow';
import { Link } from 'components/Link';
import dropdownStyles from 'components/Dropdown/Dropdown.scss';
import styles from 'components/Dropdown/Logo/Logo.scss';

export const LogoDropdown = ({ logo: { name, images } }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={dropdownStyles.dropdown}>
      <div className={cn(dropdownStyles.dropdownBtn, { [dropdownStyles.open]: isOpen })}>
        <span>{name}</span>
        <Arrow isOpen={isOpen} logoStyle onClick={toggleDropdown} />
      </div>
      <div className={cn(dropdownStyles.content, { [dropdownStyles.open]: isOpen })}>
        <ul className={dropdownStyles.contentInner}>
          {images.map(({ id, paths, alt }) => (
            <li className={styles.logo} key={id}>
              <div className={styles.logoWrapper}>
                <img src={paths?.svg || paths?.png || paths?.jpg} alt={alt} />
              </div>
              <div className={styles.buttonsWrapper}>
                {Object.entries(paths).map(([key, value]) => (
                  <Link content={`Download in ${key}`} path={value} download key={key} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
