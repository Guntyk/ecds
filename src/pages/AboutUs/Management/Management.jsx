import styles from 'pages/AboutUs/Management/Management.scss';
import { PersonCard } from 'pages/AboutUs/Management/PersonCard';
import person from 'assets/images/person.jpg';
import { useState } from 'react';

export const Management = () => {
  const [management, setManagement] = useState([
    {
      id: 1,
      name: 'Name',
      surname: 'Surname',
      role: 'Job title',
      socials: { facebook: 'https://facebook.com', instagram: 'https://instagram.com' },
      biography: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
      If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. 
      All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
      The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
    },
    {
      id: 2,
      name: 'Name',
      surname: 'Surname',
      role: 'Job title',
      socials: { instagram: 'https://instagram.com' },
      biography: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
      If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. 
      All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
      The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
      photo: { alt: 'person', src: person },
    },
    {
      id: 3,
      name: 'Name',
      surname: 'Surname',
      role: 'Job title',
      biography: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
      If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. 
      All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
      The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
    },
    {
      id: 4,
      name: 'Name',
      surname: 'Surname',
      role: 'Job title',
      socials: { instagram: 'https://instagram.com', facebook: 'https://facebook.com' },
      biography: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
      If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. 
      All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
      The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
    },
  ]);

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
