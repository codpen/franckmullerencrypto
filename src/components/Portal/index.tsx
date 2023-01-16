import { memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

const Portal: React.FC<PortalProps> = ({ children, container }) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => setElement(container ?? document.body), [container]);

  return element ? createPortal(children, element) : null;
};

export default memo(Portal);
