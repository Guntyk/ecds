import { pathnames } from 'constants/pathnames';

const {
  caribbeanDancePage,
  certificationPage,
  constructionPage,
  streetDancePage,
  managementPage,
  documentsPage,
  contactsPage,
  ballroomPage,
  calendarPage,
  membersPage,
  logosPage,
  usersPage,
  newsPage,
  mainPage,
} = pathnames;

export const menuLinks = {
  [mainPage]: [
    { id: 1, title: 'Members', path: membersPage },
    { id: 2, title: 'All news', path: newsPage },
    { id: 3, title: 'Ballroom dance', path: ballroomPage },
    { id: 4, title: 'Street dance', path: streetDancePage },
    { id: 5, title: 'Caribbean dance', path: caribbeanDancePage },
    { id: 6, title: 'Other styles', path: constructionPage },
  ],
  [ballroomPage]: [
    { id: 1, title: 'Calendar', path: calendarPage },
    { id: 2, title: 'List of active users', path: usersPage },
    { id: 3, title: 'Certification', path: certificationPage },
    { id: 4, title: 'All News', path: newsPage },
  ],
};

export const aboutUsLinks = [
  { id: 1, title: 'Management', path: managementPage },
  { id: 2, title: 'Documents', path: documentsPage },
  { id: 3, title: 'Contacts', path: contactsPage },
  { id: 4, title: 'Logos', path: logosPage },
];
