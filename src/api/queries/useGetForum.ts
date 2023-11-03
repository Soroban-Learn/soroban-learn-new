import type { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { forumApiClient } from "../apiClient";

interface IGetForum {
  username: string;
  email: string;
}

const QUERY_KEY = ["Forum"];

export const getForum = async (
  params: IGetForum
): Promise<AxiosResponse> => {
  console.log('[[NEV]]]', process.env)
  const { data } = await forumApiClient.get(
    `/?type=json&apikey=${process.env.FORUM_API_KEY}&user=${params.username}&email=${params.email}`
  );

  return data;
};

export const useGetForum = (params: IGetForum) => {
  return useQuery<any, AxiosError>(
    [QUERY_KEY, params.username, params.email],
    () => getForum(params),
    { enabled: false }
  );
};
