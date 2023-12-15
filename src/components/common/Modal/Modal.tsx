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
  isExitButton?: boolean;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  open,
  backdropClassName,
  closeOnBackdropClick = false,
  className,
  children,
  onClose,
  isVideoModal = false,
  isExitButton = false,
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
          `${isVideoModal ? "" : "py-8 bg-white"}`,
          "max-w-[640px] w-full rounded-[10px]",
          "absolute left-1/2 -translate-x-1/2 -translate-y-1/2",
          "animate-pop-up",
          "relative z-20",
          className
        )}
        ref={modalRef}
      >
        {isExitButton && (
          <button
            style={{
              position: "absolute",
              top: "-40px",
              right: "-74x",
              cursor: "pointer",
              color: "black",
              fontWeight: "bold",
            }}
            className="rounded-full border-2 border-white bg-white h-[36px] w-[36px] flex items-center justify-center mx-auto cursor-pointer"
            onClick={onClose}
          >
            &#10005;
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
