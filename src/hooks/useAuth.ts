import type { User } from "@/types";
import { useCallback } from "react"
import { useRecoilState, useSetRecoilState } from "recoil";

// Store
import { authModalState, tokenState, userState } from "@/store";

export const useAuth = () => {
  const [showModal, setShowModal] = useRecoilState(authModalState);

  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

  const toggle = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal, setShowModal]);

  const setupSession = useCallback((
    accessToken: string,
    user: User,
  ) => {
    setToken(accessToken);
    setUser(user);
    setShowModal(false);
  }, [setShowModal, setToken, setUser]);

  const logout = useCallback(() => {
    setToken("");
    setUser(null);
  }, [setToken, setUser]);

  return {
    showModal,
    toggle,
    setupSession,
    logout,
  }
}
