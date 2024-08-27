import { useRef } from 'react';

export const useScreenWidth = () => {
  const screenWidthRef = useRef(window.innerWidth);

  return screenWidthRef.current;
};
