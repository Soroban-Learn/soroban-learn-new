import type { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

interface IGetForum {
  username: string;
  email: string;
}

const QUERY_KEY = ["Forum"];

export const getForum = async (params: IGetForum): Promise<AxiosResponse> => {
  const userData = {
    username: params.username,
    email: params.email,
  };
  const { data } = await apiClient.post("/auth/forum/login", userData);

  return data;
};

export const useGetForum = (params: IGetForum) => {
  return useQuery<any, AxiosError>(
    [QUERY_KEY, params.username, params.email],
    () => getForum(params),
    { enabled: false }
  );
};
