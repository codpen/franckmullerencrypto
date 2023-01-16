import React, { useState, useEffect } from 'react';

const useIsInViewOnce = (ref: React.RefObject<HTMLElement> | HTMLElement | null) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const element = ref && 'current' in ref ? ref.current : ref;

    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      setState(entry.isIntersecting);
      observer.unobserve(element);
    }, {});

    element && observer.observe(element);

    return () => observer.unobserve(element);
  }, [ref]);

  return isVisible;
};

export default useIsInViewOnce;
