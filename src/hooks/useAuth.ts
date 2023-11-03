import type { User } from "@/types";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useCookies } from 'react-cookie';

// Store
import { authModalState, tokenState, userState } from "@/store";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const [showModal, setShowModal] = useRecoilState(authModalState);

  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

  const router = useRouter();

  const toggle = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal, setShowModal]);

  const [token] = useLocalStorage("token", "{}");
  const [user] = useLocalStorage<Partial<User>>("user", {});

  const isAuth = useCallback(() => {
    return !!token;
  }, [token]);

  const getUser = useCallback(() => {
    return user as User;
  }, [user]);

  const setupSession = useCallback(
    (accessToken: string, user: User, redirect?: boolean) => {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(accessToken);
      setUser(user);
      setShowModal(false);
      if (redirect !== false) { 
        router.push("/dashboard");
      }
    },
    [setShowModal, setToken, setUser, router]
  );

  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    removeCookie('access_token');
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
