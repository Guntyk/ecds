import { v4 as uuidv4 } from 'uuid';
import { pathnames } from 'constants/pathnames';
import { Service } from 'pages/Services/Service';
import { Ballroom } from 'pages/Ballroom/Main';
import { NewsInfo } from 'pages/News/NewsInfo';
import { Calendar } from 'pages/Calendar';
import { AboutUs } from 'pages/AboutUs';
import { Users } from 'pages/Users';
import { News } from 'pages/News';
import { Main } from 'pages/Main';
import { Members } from 'pages/Members';

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
} = pathnames;

export const routes = [
  { id: uuidv4(), path: mainPage, component: Main },
  { id: uuidv4(), path: ballroomPage, component: Ballroom },
  { id: uuidv4(), path: `${ballroomPage}${calendarPage}`, component: Calendar },
  { id: uuidv4(), path: membersPage, component: Members },
  { id: uuidv4(), path: newsPage, component: News },
  { id: uuidv4(), path: `${newsPage}/:id`, component: NewsInfo },
  ...[ballroomPage].map((path) => ({
    id: uuidv4(),
    path: `${path}${usersPage}`,
    component: Users,
  })),
  ...[managementPage, documentsPage, contactsPage, logosPage].map((path) => ({
    id: uuidv4(),
    path,
    component: AboutUs,
  })),
  { id: uuidv4(), component: Service },
];
