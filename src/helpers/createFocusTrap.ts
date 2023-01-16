import disabled from 'ally.js/maintain/disabled';
import hidden from 'ally.js/maintain/hidden';
import tabFocus from 'ally.js/maintain/tab-focus';
import firstTabbable from 'ally.js/query/first-tabbable';
import key from 'ally.js/when/key';

interface FocusTrap {
  run: () => FocusTrap;
  release: () => FocusTrap;
  destroy: () => void;
}

const traps: FocusTrap[] = [];

const createFocusTrap = (context: HTMLElement, onEscape: () => void) => {
  const previouslyFocusedElement = document.activeElement as HTMLElement;

  let tabHandle: Service | null = null,
    disabledHandle: Service | null = null,
    hiddenHandle: Service | null = null,
    keyHandle: Service | null = null;

  const trap: FocusTrap = {
    run() {
      const firstTabbableElement = context.contains(document.activeElement)
        ? (document.activeElement as HTMLElement)
        : firstTabbable({ context, defaultToContext: true });

      tabHandle = firstTabbableElement?.focus() ?? (firstTabbableElement && tabFocus({ context }));
      disabledHandle = disabled({ filter: context });
      hiddenHandle = hidden({ filter: context });
      keyHandle = key({ context, escape: onEscape });

      return trap;
    },
    release() {
      keyHandle?.disengage(), (keyHandle = null);
      hiddenHandle?.disengage(), (hiddenHandle = null);
      disabledHandle?.disengage(), (disabledHandle = null);
      tabHandle?.disengage(), (tabHandle = null);

      return trap;
    },
    destroy() {
      trap.release();
      previouslyFocusedElement?.focus();
      traps.splice(traps.indexOf(trap), 1);
    },
  };

  return traps.push(trap), trap;
};

export default Object.assign(createFocusTrap, { traps });
