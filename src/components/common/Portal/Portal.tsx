import type { FC, ReactNode } from "react";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  selector: string;
  children: ReactNode;
}

const Portal: FC<PortalProps> = ({ children, selector }) => {
  const ref = useRef<Element>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const domElement = document.querySelector(selector);
    if (domElement) {
      ref.current = domElement;
      setMounted(true);
    }
  }, [selector]);

  if (mounted && ref.current) {
    return createPortal(
      <>
        {children}
      </>,
      ref.current,
    );
  }

  return null;
}

export default Portal;
