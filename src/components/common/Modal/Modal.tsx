import type { ComponentPropsWithRef, FC, PropsWithChildren } from "react";
import { useCallback, useEffect, useRef } from "react";
import cx from "classnames";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

// Components
import Portal from "@/components/common/Portal";

export interface ModalProps {
  className?: string;
  backdropClassName?: string;
  closeOnBackdropClick?: boolean;
  open: boolean;
  onClose: () => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  open,
  backdropClassName,
  closeOnBackdropClick = false,
  className,
  children,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (closeOnBackdropClick) {
      onClose();
    }
  }, [closeOnBackdropClick, onClose]);

  useEffect(() => {
    if (open && modalRef.current) {
      disableBodyScroll(modalRef.current);
    } else if (!open && modalRef.current) {
      enableBodyScroll(modalRef.current);
    }
    return () => {
      clearAllBodyScrollLocks();
    }
  }, [open]);

  if (!open) return null;

  return (
    <Portal selector="body">
      <div className="fixed top-0 left-0 z-30 w-full h-full">
        <div
          className={cx(
            "w-full h-full bg-black/80",
            backdropClassName,
          )}
          onClick={handleClose}
        />
        <div
          className={cx(
            "max-w-[500px] w-full bg-white rounded-[10px] py-8",
            "absolute left-1/2 -translate-x-1/2 -translate-y-1/2",
            "animate-pop-up",
            className,
          )}
          ref={modalRef}
        >
          {children}
        </div>
      </div>
    </Portal>
  )
}

export default Modal;
