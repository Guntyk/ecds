import { v4 as uuidv4 } from 'uuid';
import { pathnames } from 'constants/pathnames';
import { NewsInfo } from 'pages/News/NewsInfo';
import { Ballroom } from 'pages/Ballroom';
import { Calendar } from 'pages/Calendar';
import { NotFound } from 'pages/NotFound';
import { AboutUs } from 'pages/AboutUs';
import { News } from 'pages/News';
import { Main } from 'pages/Main';

const { mainPage, ballroomPage, calendarPage, newsPage, managementPage, documentsPage, contactsPage, logosPage } =
  pathnames;

export const routes = [
  { id: uuidv4(), path: mainPage, component: Main },
  { id: uuidv4(), path: ballroomPage, component: Ballroom },
  { id: uuidv4(), path: `${ballroomPage}${calendarPage}`, component: Calendar },
  { id: uuidv4(), path: newsPage, component: News },
  { id: uuidv4(), path: `${newsPage}/:id`, component: NewsInfo },
  ...[managementPage, documentsPage, contactsPage, logosPage].map((path) => ({
    id: uuidv4(),
    path,
    component: AboutUs,
  })),
  { id: uuidv4(), component: NotFound },
];
