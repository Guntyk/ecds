import { useState } from 'react';
import cn from 'classnames';
import { Arrow } from 'components/Arrow';
import styles from 'components/Dropdown/Organization/Organization.scss';

export const OrganizationDropdown = ({ organization: { flag, country, name, manager, website, email, phone } }) => {
  const [isOpen, setIsOpen] = useState(false);

  const removeProtocol = (url) => url.replace(/^https?:\/\//, '');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={toggleDropdown}>
        <img src={`${process.env.REACT_APP_BASE_API_URL}${flag.url}`} alt={country} className={styles.flagIcon} />
        <span className={styles.name}>{country}</span>
        <Arrow className={styles.dropdownArrow} isOpen={isOpen} expandStyle />
      </div>
      <div className={cn(styles.content, { [styles.open]: isOpen })}>
        <table className={styles.infoTable}>
          <caption>{name}</caption>
          <tbody>
            <tr>
              <td>manager</td>
              <td>{manager}</td>
            </tr>
            {website && (
              <tr>
                <td>website</td>
                <td>
                  <a href={`https://${website}`} rel='noopener noreferrer' target='_blank'>
                    {removeProtocol(website)}
                  </a>
                </td>
              </tr>
            )}
            {email && (
              <tr>
                <td>e-mail</td>
                <td>
                  <a href={`mailto: ${email}`}>{email}</a>
                </td>
              </tr>
            )}
            {phone && (
              <tr>
                <td>phone</td>
                <td>
                  <a href={`tel:${phone}`}>{phone}</a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
