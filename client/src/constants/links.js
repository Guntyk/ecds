import { pathnames } from 'constants/pathnames';

const {
  newsPage,
  membersPage,
  ballroomPage,
  streetDancePage,
  caribbeanDancePage,
  managementPage,
  documentsPage,
  contactsPage,
  logosPage,
  constructionPage,
} = pathnames;

export const menuLinks = [
  { id: 1, title: 'Members', path: membersPage },
  { id: 2, title: 'All news', path: newsPage },
  { id: 3, title: 'Ballroom dance', path: ballroomPage },
  { id: 4, title: 'Street dance', path: streetDancePage },
  { id: 5, title: 'Caribbean dance', path: caribbeanDancePage },
  { id: 6, title: 'Other styles', path: constructionPage },
];

export const aboutUsLinks = [
  { id: 1, title: 'Management', path: managementPage },
  { id: 2, title: 'Documents', path: documentsPage },
  { id: 3, title: 'Contacts', path: contactsPage },
  { id: 4, title: 'Logos', path: logosPage },
];
