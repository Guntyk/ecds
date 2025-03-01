import { PersonCard } from 'pages/AboutUs/Management/PersonCard';
import styles from 'pages/AboutUs/Management/tabs/Tabs.scss';

export const Presidium = ({ data: management }) => (
  <section className={styles.membersList}>
    {management?.length > 0 &&
      management
        .filter(({ subdivision }) => subdivision === 'Presidium')
        .map((person) => <PersonCard person={person} key={person.id} />)}
  </section>
);
