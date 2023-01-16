import { useEffect } from 'react';

const addClass = (element: HTMLElement, ...classNames: string[]) =>
  classNames.forEach(className => !element.classList.contains(className) && element.classList.add(className));

const removeClass = (element: HTMLElement, ...classNames: string[]) =>
  classNames.forEach(className => element.classList.remove(className));

const useBodyScrollLock = (when: boolean) =>
  useEffect(() => {
    if (!when) return;

    addClass(document.body, 'touch-none', 'overflow-hidden');

    return () => removeClass(document.body, 'touch-none', 'overflow-hidden');
  }, [when]);

export default useBodyScrollLock;
