import { useEffect, useRef, useState } from 'react';

const useElementOnScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  return [containerRef, isVisible];
};

export default useElementOnScreen;
