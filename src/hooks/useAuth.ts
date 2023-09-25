import type { User } from "@/types";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";

// Store
import { authModalState, tokenState, userState } from "@/store";

export const useAuth = () => {
  const [showModal, setShowModal] = useRecoilState(authModalState);

  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

  const router = useRouter();

  const toggle = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal, setShowModal]);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const isAuth = useCallback(() => {
    return !!token;
  }, [token]);

  const getUser = useCallback(() => {
    return JSON.parse(user || "{}") as User;
  }, [user]);

  const setupSession = useCallback(
    (accessToken: string, user: User) => {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(accessToken);
      setUser(user);
      setShowModal(false);
      router.push("/dashboard");
    },
    [setShowModal, setToken, setUser, router]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    router.push("/"); // Optional: Redirect to login or another relevant page after logout
  }, [setToken, setUser, router]);

  return {
    showModal,
    toggle,
    setupSession,
    logout,
    isAuth,
    getUser,
  };
};
