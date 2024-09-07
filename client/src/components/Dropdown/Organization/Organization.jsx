import cn from 'classnames';
import { Arrow } from 'components/Arrow';
import styles from 'components/Dropdown/Organization/Organization.scss';

export const OrganizationDropdown = ({
  className,
  organization: { flag, country, name, manager, website, email, phone, status },
  nonClosable,
  onToggle,
  isOpen,
}) => {
  const removeProtocol = (url) => url.replace(/^https?:\/\//, '');

  if (nonClosable) {
    isOpen = true;
  }

  return (
    <div className={cn(styles.container, className)}>
      <div
        className={cn(styles.header, { [styles.opened]: isOpen })}
        {...(!nonClosable && { onClick: onToggle })}
        {...(nonClosable && { style: { cursor: 'default' } })}
      >
        <img src={`${process.env.REACT_APP_BASE_API_URL}${flag.url}`} alt={country} className={styles.flagIcon} />
        <span className={styles.name}>{country}</span>
        {!nonClosable && <Arrow className={styles.dropdownArrow} isOpen={isOpen} expandStyle />}
      </div>
      <div className={cn(styles.content, { [styles.open]: isOpen })}>
        <table className={styles.infoTable}>
          <caption>{name}</caption>
          <tbody>
            <tr>
              <td>status</td>
              <td>{status}</td>
            </tr>
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
                    +{phone}
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
