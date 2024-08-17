import { useState } from 'react';
import cn from 'classnames';
import { Arrow } from 'components/Arrow';
import styles from 'components/Dropdown/Organization/Organization.scss';

export const OrganizationDropdown = ({
  className,
  organization: { flag, country, name, manager, website, email, phone },
  opened,
}) => {
  const [isOpen, setIsOpen] = useState(opened ? true : false);

  const removeProtocol = (url) => url.replace(/^https?:\/\//, '');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn(styles.container, className)}>
      <div className={cn(styles.header, { [styles.opened]: opened })} {...(!opened && { onClick: toggleDropdown })}>
        <img src={`${process.env.REACT_APP_BASE_API_URL}${flag.url}`} alt={country} className={styles.flagIcon} />
        <span className={styles.name}>{country}</span>
        {!opened && <Arrow className={styles.dropdownArrow} isOpen={isOpen} expandStyle />}
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
                  <a
                    href={`https://${website}`}
                    rel='noopener noreferrer'
                    target='_blank'
                    {...(!isOpen && { tabIndex: -1 })}
                  >
                    {removeProtocol(website)}
                  </a>
                </td>
              </tr>
            )}
            {email && (
              <tr>
                <td>e-mail</td>
                <td>
                  <a href={`mailto: ${email}`} {...(!isOpen && { tabIndex: -1 })}>
                    {email}
                  </a>
                </td>
              </tr>
            )}
            {phone && (
              <tr>
                <td>phone</td>
                <td>
                  <a href={`tel:${phone}`} {...(!isOpen && { tabIndex: -1 })}>
                    {phone}
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
