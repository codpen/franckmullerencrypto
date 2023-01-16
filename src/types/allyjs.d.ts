// ally.js
type Service = {
  disengage: () => void;
};

type KeyBinding = Record<'escape' | 'enter', (event: KeyboardEvent) => void>;

declare module 'ally.js/esm/style/focus-source' {
  export default function (): void;
}

declare module 'ally.js/maintain/tab-focus' {
  export default function (args: { context?: HTMLElement }): Service;
}

declare module 'ally.js/maintain/disabled' {
  export default function (args: { context?: HTMLElement; filter?: HTMLElement }): Service;
}

declare module 'ally.js/maintain/hidden' {
  export default function (args: { context?: HTMLElement; filter?: HTMLElement }): Service;
}

declare module 'ally.js/when/key' {
  export default function (args: { context?: HTMLElement; filter?: HTMLElement } & Partial<KeyBinding>): Service;
}

declare module 'ally.js/query/first-tabbable' {
  export default function (args: {
    context?: HTMLElement;
    ignoreAutofocus?: boolean;
    defaultToContext?: boolean;
    includeOnlyTabbable?: boolean;
    strategy?: 'quick' | 'strict' | 'all';
  }): HTMLElement | null;
}

declare module 'ally.js/esm/style/focus-source';
