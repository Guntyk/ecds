import { pathnames } from 'constants/pathnames';

const {
  mainPage,
  contactsPage,
  ballroomPage,
  certificationPage,
  streetDancePage,
  caribbeanDancePage,
  constructionPage,
} = pathnames;

export const contactUsBlockPages = [mainPage, contactsPage, ballroomPage];

export const constructionPages = [
  constructionPage,
  streetDancePage,
  caribbeanDancePage,
  { [ballroomPage]: [certificationPage] },
];
