import cn from 'classnames';
import { PersonCard } from 'pages/AboutUs/Management/PersonCard';
import styles from 'pages/AboutUs/Management/tabs/Tabs.scss';

export const Committees = ({ data: management }) => {
  if (!management?.length) return null;

  const nonPresidiumMembers = management.filter(({ subdivision }) => subdivision !== 'Presidium');

  const committeeGroups = nonPresidiumMembers.reduce((groups, person) => {
    const { subdivision } = person;
    if (!groups[subdivision]) {
      groups[subdivision] = [];
    }
    groups[subdivision].push(person);
    return groups;
  }, {});

  return Object.entries(committeeGroups).map(([committeeName, committeeMembers], index) => (
    <section className={cn({ [styles.section]: index !== 0 })} key={committeeName}>
      <div className={styles.title}>{committeeName}</div>
      <div className={styles.membersList}>
        {committeeMembers.map((person) => (
          <PersonCard person={person} key={person.id} />
        ))}
      </div>
    </section>
  ));
};
