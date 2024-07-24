import { pathnames } from './pathnames';

const { newsPage, membersPage } = pathnames;

export const menuLinks = [
  { id: 1, name: 'Members', link: membersPage },
  { id: 2, name: 'All news', link: newsPage },
  { id: 3, name: 'Ballroom dance', link: '/ballroom' },
  { id: 4, name: 'Street dance', link: '/street-dance' },
  { id: 5, name: 'Lindy hop', link: '/lindy-hop' },
  { id: 6, name: 'Caribbean dance', link: '/caribbean' },
  { id: 7, name: "Rock'N'Roll dance", link: '/rock-n-roll' },
];
