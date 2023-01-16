import anime from 'animejs';
import Portal from 'components/Portal';
import createFocusTrap from 'helpers/createFocusTrap';
import useEvent from 'hooks/useEvent';
import { useEffect, useState } from 'react';

export interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const useFocusTrap = (context: HTMLElement | null, ...args: [onEscape: () => void]) => {
  const onEscape = useEvent(args[0]);

  useEffect(() => {
    if (!context) return;

    const focusTrap = new Promise<ReturnType<typeof createFocusTrap>>(resolve => {
      createFocusTrap.traps[createFocusTrap.traps.length - 1]?.release();
      resolve(createFocusTrap(context, onEscape).run());
    });

    return () => {
      focusTrap
        .then(trap => trap.destroy())
        // needs to be called on the next tick in the event loop
        .then(() => createFocusTrap.traps[createFocusTrap.traps.length - 1]?.run());
    };
  }, [context, onEscape]);
};

const useBodyScrollLock = (element: HTMLElement | null) => {
  useEffect(() => {
    if (!element) return;

    document.body.classList.add('touch-none', 'scrolling-auto', 'overflow-hidden');

    return () => document.body.classList.remove('touch-none', 'scrolling-auto', 'overflow-hidden');
  }, [element]);
};

const ANIMATION_DURATION = 150;

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!element) return;

    const parentElement = element.parentElement;
    const nextElementSibling = element.nextElementSibling;
    const lastElementChild = element.lastElementChild;

    anime.remove([element, lastElementChild]);
    anime
      .timeline({ targets: element, easing: 'easeOutQuad', duration: ANIMATION_DURATION })
      .add({ opacity: 1 })
      .add({ targets: lastElementChild, translateY: ['-5%', 0] }, 0);

    return () => {
      if (!parentElement) return;
      else if (nextElementSibling) nextElementSibling.before(element);
      else parentElement.appendChild(element);

      anime.remove([element, lastElementChild]);
      anime
        .timeline({
          targets: element,
          easing: 'easeOutQuad',
          duration: ANIMATION_DURATION,
          complete: () => parentElement.contains(element) && parentElement.removeChild(element),
        })
        .add({ opacity: 0 })
        .add({ targets: lastElementChild, translateY: '-5%' }, 0);
    };
  }, [element]);

  useBodyScrollLock(element);
  useFocusTrap(element, onClose);

  return (
    <Portal>
      <div
        className="fixed flex flex-col justify-center items-center w-full h-full top-0 left-0 opacity-0 z-[1000]"
        ref={setElement}
      >
        <span className="absolute -inset-96 bg-black bg-opacity-50" aria-hidden onClick={onClose} />
        <div className="relative flex-auto grow-0 flex flex-col justify-center items-stretch overflow-hidden max-w-full rounded-xl bg-white shadow-10 z-50">
          {children}
        </div>
      </div>
    </Portal>
  );
};

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="shrink-0 px-6 py-3 border-b border-gray-20">{children}</div>;
};

Header.displayName = 'Modal.Header';

const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="shrink-0 px-6 py-3 border-t border-gray-20">{children}</div>;
};

Footer.displayName = 'Modal.Footer';

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex-auto grow-0 overflow-auto overscroll-contain">
      <div className="px-6 py-4">{children}</div>
    </div>
  );
};

Body.displayName = 'Modal.Body';

export default Object.assign(Modal, { Header, Footer, Body });
