import { type RefObject, useEffect, useCallback } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLDivElement>,
  callback: () => void,
) => {
  const handleClick = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  }, [ref, callback]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
};
