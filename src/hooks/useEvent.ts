import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect';
import { useCallback, useRef } from 'react';

function useEvent<T>(handler: T) {
  const ref = useRef<T>(handler);

  // In a real implementation, this would run before layout effects
  useIsomorphicLayoutEffect(() => {
    ref.current = handler;
  });

  return useCallback((...args: T extends (...args: any[]) => any ? Parameters<T> : []) => {
    // In a real implementation, this would throw if called during render
    return typeof ref.current === 'function' ? ref.current(...args) : ref.current;
  }, []) as T extends (...args: any[]) => any ? T : T extends NonNullable<T> ? () => T : T;
}

export default useEvent;
