import { useCallback, useState } from "react";

export const useModal = (defaultState = false) => {
  const [showModal, setShowModal] = useState<boolean>(defaultState);

  const toggle = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  return { showModal, toggle };
}
