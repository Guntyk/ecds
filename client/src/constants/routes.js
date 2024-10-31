import { v4 as uuid } from 'uuid';
import { pathnames } from 'constants/pathnames';
import { EventInfo } from 'pages/Calendar/EventInfo';
import { Certification } from 'pages/Certification';
import { NotFound } from 'pages/Services/NotFound';
import { Service } from 'pages/Services/Service';
import { Ballroom } from 'pages/Ballroom/Main';
import { NewsInfo } from 'pages/News/NewsInfo';
import { Calendar } from 'pages/Calendar';
import { AboutUs } from 'pages/AboutUs';
import { Members } from 'pages/Members';
import { Users } from 'pages/Users';
import { News } from 'pages/News';
import { Main } from 'pages/Main';

const {
  mainPage,
  ballroomPage,
  calendarPage,
  newsPage,
  managementPage,
  documentsPage,
  contactsPage,
  logosPage,
  usersPage,
  membersPage,
  certificationPage,
} = pathnames;

const subPageComponents = {
  [calendarPage]: Calendar,
  [certificationPage]: Certification,
  [usersPage]: Users,
  [newsPage]: News,
};

export const routes = [
  { id: uuid(), path: mainPage, component: Main },
  { id: uuid(), path: ballroomPage, component: Ballroom },
  { id: uuid(), path: membersPage, component: Members },
  { id: uuid(), path: newsPage, component: News },
  { id: uuid(), path: `${newsPage}/:id`, component: NewsInfo },
  ...[calendarPage, certificationPage, usersPage, newsPage].map((subPage) => ({
    id: uuid(),
    path: `${ballroomPage}${subPage}`,
    component: subPageComponents[subPage] || NotFound,
  })),
  { id: uuid(), path: `${ballroomPage}${calendarPage}/:slug`, component: EventInfo },
  ...[managementPage, documentsPage, contactsPage, logosPage].map((path) => ({
    id: uuid(),
    path,
    component: AboutUs,
  })),
  { id: uuid(), component: Service },
];
