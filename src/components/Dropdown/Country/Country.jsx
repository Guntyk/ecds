import cn from 'classnames';
import { useState } from 'react';
import styles from 'components/Dropdown/Country/Country.scss';

export const CountryDropdown = ({ country: { flag, name, organization, manager, website, email, phone } }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={toggleDropdown}>
        <img src={flag} alt={name} className={styles.flagIcon} />
        <span className={styles.name}>{name}</span>
        <div className={cn(styles.arrowIcon, { [styles.open]: isOpen })}>
          <span className={styles.arrow} />
          <span className={styles.arrow} />
        </div>
      </div>
      <div className={cn(styles.content, { [styles.open]: isOpen })}>
        <table className={styles.infoTable}>
          <caption>{organization}</caption>
          <tr>
            <td>manager</td>
            <td>{manager}</td>
          </tr>
          {website && (
            <tr>
              <td>website</td>
              <td>
                <a href={`https://${website}`} rel='noopener noreferrer' target='_blank'>
                  {website}
                </a>
              </td>
            </tr>
          )}
          <tr>
            <td>e-mail</td>
            <td>
              <a href={`mailto: ${email}`}>{email}</a>
            </td>
          </tr>
          <tr>
            <td>phone</td>
            <td>
              <a href={`tel:${phone}`}>{phone}</a>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};
