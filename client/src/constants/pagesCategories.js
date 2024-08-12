import { pathnames } from 'constants/pathnames';

const {
  mainPage,
  contactsPage,
  ballroomPage,
  usersPage,
  certificationPage,
  streetDancePage,
  caribbeanDancePage,
  constructionPage,
  membersPage,
} = pathnames;

export const contactUsBlockPages = [mainPage, contactsPage, ballroomPage];

export const constructionPages = [
  constructionPage,
  streetDancePage,
  caribbeanDancePage,
  membersPage,
  { [ballroomPage]: [usersPage, certificationPage] },
];
