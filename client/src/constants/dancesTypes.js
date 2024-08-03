import ballroom from 'assets/images/ballroom-couple.jpg';
import { pathnames } from 'constants/pathnames';

const { ballroomPage, streetDancePage, caribbeanDancePage, lindyHopPage, rockNRollPage } = pathnames;

export const dancesTypes = [
  { id: 1, name: 'Ballroom dance', path: ballroomPage, image: { src: ballroom, alt: 'ballroom couple' } },
  { id: 2, name: 'Street dance', path: streetDancePage },
  { id: 3, name: 'Caribbean dance', path: caribbeanDancePage },
  { id: 4, name: 'Lindy Hop', path: lindyHopPage },
  { id: 5, name: "Rock'n'roll", path: rockNRollPage },
];
