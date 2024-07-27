import { pathnames } from './pathnames';

const { newsPage, membersPage, ballroomDancePage, streetDancePage, caribbeanDancePage, lindyHopPage, rockNRollPage } =
  pathnames;

export const menuLinks = [
  { id: 1, name: 'Members', link: membersPage },
  { id: 2, name: 'All news', link: newsPage },
  { id: 3, name: 'Ballroom dance', link: ballroomDancePage },
  { id: 4, name: 'Street dance', link: streetDancePage },
  { id: 5, name: 'Lindy hop', link: lindyHopPage },
  { id: 6, name: 'Caribbean dance', link: caribbeanDancePage },
  { id: 7, name: "Rock'N'Roll dance", link: rockNRollPage },
];
