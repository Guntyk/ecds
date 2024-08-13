import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { activeUsersTypes } from 'constants/usersTypes';
import { TabSelector } from 'components/Button/TabSelector';
import { Container } from 'components/Container';
import { UserCard } from 'pages/Users/UserCard';
import styles from 'pages/Users/Users.scss';

export const Users = () => {
  const { search } = useLocation();
  const searchTypeParam = new URLSearchParams(search).get('type');

  const [activeTypeIndex, setActiveTypeIndex] = useState(
    activeUsersTypes.findIndex((userType) => userType === searchTypeParam)
  );

  const users = [
    {
      id: 1,
      role: 'dancer',
      name: 'Emily Johnson',
      level: 'B',
      photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 2,
      role: 'dancer',
      name: 'Michael Smith',
      level: 'A',
      photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: 3,
      role: 'judge',
      name: 'Sarah Williams',
      level: 'S',
      photo: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    { id: 4, role: 'dancer', name: 'David Brown', level: 'C', photo: 'https://randomuser.me/api/portraits/men/4.jpg' },
    {
      id: 5,
      role: 'judge',
      name: 'Jessica Jones',
      level: 'D',
      photo: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    { id: 6, role: 'dancer', name: 'James Garcia', level: 'E', photo: 'https://randomuser.me/api/portraits/men/6.jpg' },
    {
      id: 7,
      role: 'dancer',
      name: 'Linda Miller',
      level: 'B',
      photo: 'https://randomuser.me/api/portraits/women/7.jpg',
    },
    { id: 8, role: 'judge', name: 'Robert Wilson', level: 'F', photo: 'https://randomuser.me/api/portraits/men/8.jpg' },
    {
      id: 9,
      role: 'dancer',
      name: 'Patricia Moore',
      level: 'A',
      photo: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      id: 10,
      role: 'dancer',
      name: 'William Taylor',
      level: 'D',
      photo: 'https://randomuser.me/api/portraits/men/10.jpg',
    },
    {
      id: 11,
      role: 'judge',
      name: 'Barbara Anderson',
      level: 'S',
      photo: 'https://randomuser.me/api/portraits/women/11.jpg',
    },
    {
      id: 12,
      role: 'dancer',
      name: 'Christopher Thomas',
      level: 'C',
      photo: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    {
      id: 13,
      role: 'dancer',
      name: 'Jennifer White',
      level: 'E',
      photo: 'https://randomuser.me/api/portraits/women/13.jpg',
    },
    {
      id: 14,
      role: 'judge',
      name: 'Charles Harris',
      level: 'F',
      photo: 'https://randomuser.me/api/portraits/men/14.jpg',
    },
    {
      id: 15,
      role: 'dancer',
      name: 'Mary Martin',
      level: 'B',
      photo: 'https://randomuser.me/api/portraits/women/15.jpg',
    },
    {
      id: 16,
      role: 'dancer',
      name: 'Joseph Thompson',
      level: 'A',
      photo: 'https://randomuser.me/api/portraits/men/16.jpg',
    },
    {
      id: 17,
      role: 'judge',
      name: 'Elizabeth Lee',
      level: 'D',
      photo: 'https://randomuser.me/api/portraits/women/17.jpg',
    },
    {
      id: 18,
      role: 'dancer',
      name: 'Thomas Walker',
      level: 'C',
      photo: 'https://randomuser.me/api/portraits/men/18.jpg',
    },
    {
      id: 19,
      role: 'dancer',
      name: 'Susan Hall',
      level: 'E',
      photo: 'https://randomuser.me/api/portraits/women/19.jpg',
    },
    {
      id: 20,
      role: 'judge',
      name: 'Richard Young',
      level: 'F',
      photo: 'https://randomuser.me/api/portraits/men/20.jpg',
    },
  ];

  return (
    <Container>
      <div className={styles.page}>
        <h1 className={styles.title}>List of active users</h1>
        <div className={styles.pageContent}>
          <section className={styles.navigation}>
            <TabSelector
              tabs={activeUsersTypes}
              activeTabIndex={activeTypeIndex}
              setActiveTabIndex={setActiveTypeIndex}
            />
          </section>
          <ul className={styles.users}>
            {users
              .filter(({ role }) => role === searchTypeParam?.slice(0, -1))
              .map((user) => (
                <UserCard user={user} key={user.id} />
              ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};
