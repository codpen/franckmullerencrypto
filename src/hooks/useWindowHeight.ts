import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect';
import { useState } from 'react';
import { fromEvent, map, merge, timer } from 'rxjs';

const useWindowHeight = () => {
  const [height, setHeight] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    const subscription = merge(timer(0), fromEvent(window, 'resize'))
      .pipe(map(() => window.innerHeight))
      .subscribe(setHeight);

    return () => subscription.unsubscribe();
  }, []);

  return height;
};

export default useWindowHeight;
