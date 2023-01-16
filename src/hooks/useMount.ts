import { useEffect, useRef } from 'react';

export const useMount = () => {
  const didMountRef = useRef(false);

  useEffect(() => {
    didMountRef.current = true;

    return () => void (didMountRef.current = false);
  }, []);

  return didMountRef;
};
