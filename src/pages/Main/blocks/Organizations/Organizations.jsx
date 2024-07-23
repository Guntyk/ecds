import { OrganizationDropdown } from 'components/Dropdown/Organization';
import { Container } from 'components/Container';
import { organizationsData } from 'constants/organizationsData';
import styles from 'pages/Main/blocks/Organizations/Organizations.scss';

export const Organizations = () => (
  <Container>
    <section className={styles.block}>
      <h2 className={styles.title}>National organizations</h2>
      <p className={styles.subtitle}>that are part of the European Confederation of Dance Sports</p>
      <ul className={styles.organizationsList}>
        {organizationsData.map((organization) => (
          <li className={styles.organization}>
            <OrganizationDropdown organization={organization} />
          </li>
        ))}
      </ul>
    </section>
  </Container>
);
