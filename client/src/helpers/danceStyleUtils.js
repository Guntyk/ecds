import { pathnames } from 'constants/pathnames';

export const getDanceStyleFromPath = (pathname) => {
  const danceStyleMap = {
    [pathnames.ballroomPage]: 'Ballroom',
    [pathnames.streetDancePage]: 'Street',
    [pathnames.caribbeanDancePage]: 'Caribbean',
  };
  return Object.entries(danceStyleMap).find(([key]) => pathname.includes(key))?.[1] || null;
};
