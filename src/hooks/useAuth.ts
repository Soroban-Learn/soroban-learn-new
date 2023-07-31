import type { User } from "@/types";
import { useCallback } from "react"
import { useSetRecoilState } from "recoil";

// Store
import { tokenState, userState } from "@/store/sessionStates";

export const useAuth = () => {
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

  const setupSession = useCallback((
    accessToken: string,
    user: User,
  ) => {
    setToken(accessToken);
    setUser(user);
    // Cookies.set("access_token", accessToken);
    // Cookies.remove("access_token");
  }, [setToken, setUser]);

  const logout = useCallback(() => {
    setToken("");
    setUser(null);
    // Cookies.remove("access_token");
  }, [setToken, setUser]);

  return {
    setupSession,
    logout,
  }
}
