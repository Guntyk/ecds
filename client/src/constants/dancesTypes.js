import { pathnames } from 'constants/pathnames';

const { constructionPage, ballroomPage, streetDancePage, caribbeanDancePage } = pathnames;

export const dancesTypes = [
  { id: 1, name: 'Ballroom dance', path: ballroomPage, key: 'ballroom', styleNames: ['European', 'Latin'] },
  { id: 2, name: 'Street dance', path: streetDancePage, key: 'street', styleNames: ['Hip-Hop', 'Breaking', 'Others'] },
  {
    id: 3,
    name: 'Caribbean dance',
    path: caribbeanDancePage,
    key: 'caribbean',
    styleNames: ['Salsa', 'Merengue', 'Bachata', 'Others'],
  },
  { id: 4, name: 'Other styles', path: constructionPage, key: 'other' },
];
