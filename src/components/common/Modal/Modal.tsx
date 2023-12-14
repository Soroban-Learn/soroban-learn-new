import type { FC, PropsWithChildren } from "react";
import { useCallback, useEffect, useState } from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

import cx from "classnames";

// Components
// import Portal from "@/components/common/Portal";

export interface ModalProps {
  className?: string;
  backdropClassName?: string;
  closeOnBackdropClick?: boolean;
  open: boolean;
  onClose: () => void;
  isVideoModal?: boolean;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  open,
  backdropClassName,
  closeOnBackdropClick = false,
  className,
  children,
  onClose,
  isVideoModal = false,
}) => {
  const [modalElement, setModalElement] = useState<HTMLDivElement>();

  const handleClose = useCallback(() => {
    if (closeOnBackdropClick) {
      onClose();
    }
  }, [closeOnBackdropClick, onClose]);

  const modalRef = useCallback((element: HTMLDivElement) => {
    setModalElement(element);
  }, []);

  useEffect(() => {
    if (open && modalElement) {
      disableBodyScroll(modalElement);
    } else if (!open && modalElement) {
      enableBodyScroll(modalElement);
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [open, modalElement]);

  if (!open) return null;

  return (
    <div className="fixed top-0 left-0 z-30 w-full h-full overflow-auto">
      <div
        className={cx(
          "w-full h-full bg-black/80",
          "fixed top-0 left-0 z-10",
          backdropClassName
        )}
        onClick={handleClose}
      />
      <div
        className={cx(
          `${isVideoModal ? "" : "py-8"}`,
          "max-w-[640px] w-full bg-white rounded-[10px]",
          "absolute left-1/2 -translate-x-1/2 -translate-y-1/2",
          "animate-pop-up",
          "relative z-20",
          className
        )}
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
