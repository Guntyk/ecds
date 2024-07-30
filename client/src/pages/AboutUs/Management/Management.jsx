import { useState } from 'react';
import { PersonCard } from 'pages/AboutUs/Management/PersonCard';
import styles from 'pages/AboutUs/Management/Management.scss';

export const Management = () => {
  const [management, setManagement] = useState([]);

  return (
    <div className={styles.management}>
      {management.length > 0 ? (
        management.map((person) => <PersonCard person={person} key={person.id} />)
      ) : (
        <p className={styles.error}>Error of loading data</p>
      )}
    </div>
  );
};
