import { v4 as uuidv4 } from 'uuid';
import { pathnames } from 'constants/pathnames';
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
import { EventInfo } from 'pages/Calendar/EventInfo';

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
  { id: uuidv4(), path: mainPage, component: Main },
  { id: uuidv4(), path: ballroomPage, component: Ballroom },
  { id: uuidv4(), path: membersPage, component: Members },
  { id: uuidv4(), path: newsPage, component: News },
  { id: uuidv4(), path: `${newsPage}/:id`, component: NewsInfo },
  { id: uuidv4(), path: '/event-info', component: EventInfo },

  ...[calendarPage, certificationPage, usersPage, newsPage].map((subPage) => ({
    id: uuidv4(),
    path: `${ballroomPage}${subPage}`,
    component: subPageComponents[subPage] || NotFound,
  })),
  ...[managementPage, documentsPage, contactsPage, logosPage].map((path) => ({
    id: uuidv4(),
    path,
    component: AboutUs,
  })),
  { id: uuidv4(), component: Service },
];
