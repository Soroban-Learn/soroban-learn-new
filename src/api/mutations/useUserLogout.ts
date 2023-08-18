import type { AxiosResponse, AxiosError } from "axios";
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../apiClient';
import { queryClient } from "../queryClient";
import { useAuth } from "@/hooks";

const USER_LOGOUT_QUERY_KEY = ['userLogout'];

export const userLogout = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
}

export const useUserLogout = () => {
  const { logout } = useAuth();

  return useMutation<void, AxiosError, void>(userLogout, {
    onSuccess: () => {
      logout();
      queryClient.invalidateQueries(USER_LOGOUT_QUERY_KEY);
    },
  });
}
