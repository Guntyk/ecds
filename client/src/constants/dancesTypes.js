import ballroom from 'assets/images/dances/ballroom-dance.webp';
import street from 'assets/images/dances/street-dance.webp';
import caribbean from 'assets/images/dances/caribbean-dance.webp';
import { pathnames } from 'constants/pathnames';

const { ballroomPage, streetDancePage, caribbeanDancePage, lindyHopPage, rockNRollPage } = pathnames;

export const dancesTypes = [
  { id: 1, name: 'Ballroom dance', path: ballroomPage, image: { src: ballroom, alt: 'ballroom couple' } },
  { id: 2, name: 'Street dance', path: streetDancePage, image: { src: street, alt: 'street dancer' } },
  { id: 3, name: 'Caribbean dance', path: caribbeanDancePage, image: { src: caribbean, alt: 'caribbean couple' } },
  { id: 4, name: 'Lindy Hop', path: lindyHopPage },
  { id: 5, name: "Rock'n'roll", path: rockNRollPage },
];
