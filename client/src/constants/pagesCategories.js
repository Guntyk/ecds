import { pathnames } from 'constants/pathnames';

const {
  mainPage,
  contactsPage,
  ballroomPage,
  usersPage,
  certificationPage,
  streetDancePage,
  caribbeanDancePage,
  lindyHopPage,
  rockNRollPage,
  membersPage,
} = pathnames;

export const contactUsBlockPages = [mainPage, contactsPage, ballroomPage];

export const constructionPages = [
  streetDancePage,
  caribbeanDancePage,
  lindyHopPage,
  rockNRollPage,
  membersPage,
  { [ballroomPage]: [usersPage, certificationPage] },
];
